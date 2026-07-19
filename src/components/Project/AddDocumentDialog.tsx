"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, FileText, Plus, Globe, Lock, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import FormItem from "@/components/shared/FormItem";
import CustomSelect from "@/components/shared/CustomSelect";
import {
  useAddProjectDocumentMutation,
  useGetDocumentTypesQuery,
} from "@/redux/apis/DocumentApis";
import { useGetFoldersQuery, useCreateFolderMutation } from "@/redux/apis/folderApis";
import { getErrorMessage } from "@/lib/errors";

// ─── Schema ────────────────────────────────────────────────────────────────
const AddDocumentSchema = z.object({
  file: z.any().refine((file) => file instanceof File, "Please upload a file"),
  description: z.string().min(1, "Description is required"),
  documentTypeId: z.string().min(1, "Document type is required"),
  folderId: z.string().min(1, "Folder is required"),
  isPublic: z.boolean(),
});

type AddDocumentValues = z.infer<typeof AddDocumentSchema>;

// ─── Props ─────────────────────────────────────────────────────────────────
interface AddDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────
const AddDocumentDialog = ({
  open,
  onOpenChange,
  projectId,
  projectName,
}: AddDocumentDialogProps) => {
  const [addDocument, { isLoading: isAdding }] = useAddProjectDocumentMutation();
  const [createFolder, { isLoading: isCreatingFolder }] = useCreateFolderMutation();
  const [folderSearchQuery, setFolderSearchQuery] = useState("");
  const { data: docTypesRes, isLoading: loadingTypes } = useGetDocumentTypesQuery();
  const { data: foldersRes, isLoading: loadingFolders } = useGetFoldersQuery(
    { page: 1, limit: 200, searchQuery: folderSearchQuery },
    { skip: !open }
  );

  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");


  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddDocumentValues>({
    resolver: zodResolver(AddDocumentSchema),
    defaultValues: {
      file: undefined,
      description: "",
      documentTypeId: "",
      folderId: "",
      isPublic: false,
    },
  });

  // Both lists are read inside their memo: `res?.data || []` produced a fresh
  // array identity on every render, so depending on it re-ran the memo every
  // time regardless of whether the data had actually changed.
  const docTypeOptions = useMemo(() => {
    return (docTypesRes?.data ?? []).map((dt) => ({
      value: dt.id,
      label: dt.name,
    }));
  }, [docTypesRes]);

  const folderOptions = useMemo(() => {
    return (foldersRes?.data ?? []).map((f) => ({
      value: f.id,
      label: f.name,
    }));
  }, [foldersRes]);

  const onSubmit = async (data: AddDocumentValues) => {
    const folderId = data.folderId === "" || !data.folderId ? null : data.folderId;
    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("description", data.description);
    formData.append("documentTypeId", data.documentTypeId);
    if (folderId) {
      formData.append("folderId", folderId);
    }
    formData.append("isPublic", data.isPublic.toString());
    formData.append("file", data.file as File);
    try {
      await addDocument(formData).unwrap();

      toast.success("Document added successfully!");
      reset();
      onOpenChange(false);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to add document"));
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="size-7 text-rose-500" />
            <div className="flex flex-col">
              <span>Add Document</span>
              {projectName && (
                <span className="text-xs font-normal text-muted-foreground">
                  {projectName}
                </span>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          {/* Custom File Upload Drag and Drop Zone */}
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange, value } }) => {
              const file = value as File | undefined;
              return (
                <div className="space-y-1.5">
                  <span className="text-sm font-semibold text-foreground/80 flex items-center gap-1">
                    Document File <span className="text-destructive">*</span>
                  </span>
                  <div
                    onClick={() => document.getElementById("file-upload")?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files && files.length > 0) {
                        onChange(files[0]);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-muted/10 ${errors.file ? "border-destructive bg-destructive/5" : "border-muted-foreground/30 hover:border-primary/50"
                      }`}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          onChange(files[0]);
                        }
                      }}
                    />

                    {file ? (
                      <div className="flex items-center gap-3 w-full bg-muted/20 p-3 rounded-lg border">
                        <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
                          <FileText className="size-6 text-rose-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange(undefined);
                          }}
                          className="text-xs text-destructive hover:underline font-semibold p-1"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center flex flex-col items-center">
                        <div className="size-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                          <UploadCloud className="size-5 text-rose-500" />
                        </div>
                        <p className="text-sm font-medium">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, XLS, PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>
                  {errors.file && (
                    <p className="text-destructive text-xs mt-1">{errors.file.message as string}</p>
                  )}
                </div>
              );
            }}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormItem
                label="Description"
                inputType="textarea"
                textarea={true}
                placeholder="Brief description of this document..."
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
                {...field}
                required
              />
            )}
          />

          {/* Document Type + Folder side by side */}
          <div className="grid grid-cols-1 gap-4 items-start">
            {/* Document Type */}
            <Controller
              name="documentTypeId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Type"
                  placeholder={loadingTypes ? "Loading types..." : "Select type"}
                  name={field.name}
                  value={field.value}
                  onChange={(val) => field.onChange(val as string)}
                  options={docTypeOptions}
                  multiple={false}
                  loading={loadingTypes}
                  required
                  error={errors.documentTypeId}
                />
              )}
            />

            {/* Folder Select or New Inline Creation */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground/80">Folder</span>
                <button
                  type="button"
                  onClick={() => setIsCreatingNewFolder(!isCreatingNewFolder)}
                  className="text-xs text-primary hover:underline font-semibold"
                >
                  {isCreatingNewFolder ? "Select Existing" : "+ New Folder"}
                </button>
              </div>

              {isCreatingNewFolder ? (
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <FormItem
                      inputType="text"
                      placeholder="Folder name"
                      value={newFolderName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewFolderName(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={async () => {
                      if (!newFolderName.trim()) {
                        toast.error("Folder name cannot be empty");
                        return;
                      }
                      try {
                        const newFolder = await createFolder({
                          name: newFolderName,
                        }).unwrap();
                        toast.success("Folder created!");
                        setValue("folderId", newFolder.id);
                        setNewFolderName("");
                        setIsCreatingNewFolder(false);
                      } catch (err: unknown) {
                        toast.error(getErrorMessage(err, "Failed to create folder"));
                      }
                    }}
                    disabled={isCreatingFolder}
                    className="h-9 bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    {isCreatingFolder ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              ) : (
                <Controller
                  name="folderId"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      label=""
                      placeholder={loadingFolders ? "Loading folders..." : "No folder"}
                      name={field.name}
                      value={field.value}
                      onChange={(val) => field.onChange(val as string)}
                      options={folderOptions}
                      multiple={false}
                      loading={loadingFolders}
                      onSearch={setFolderSearchQuery}
                    />
                  )}
                />
              )}
            </div>
          </div>

          {/* Is Public toggle */}
          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div className="flex items-center gap-2">
                  {field.value ? (
                    <Globe className="size-4 text-emerald-500" />
                  ) : (
                    <Lock className="size-4 text-amber-500" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {field.value ? "Public" : "Private"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {field.value
                        ? "Visible to all project members"
                        : "Only visible to managers"}
                    </span>
                  </div>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-rose-600 hover:bg-rose-700 text-white border-0 gap-1.5"
              disabled={isAdding}
            >
              {isAdding ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Plus className="size-3.5" />
              )}
              Add Document
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;

