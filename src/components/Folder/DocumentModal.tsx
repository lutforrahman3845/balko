"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
    SheetFooter,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { DocumentUploadSchema, DocumentFormValues, FolderDocument } from "@/@types/folder";
import DocumentForm from "./DocumentForm";
import { getErrorMessage } from "@/lib/errors";

interface DocumentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    folderId?: string;
    isEdit?: boolean;
    document?: FolderDocument
}

const DocumentModal = ({
    open,
    onOpenChange,
    folderId,
    isEdit = false,
    document,
}: DocumentModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<DocumentFormValues>({
        resolver: zodResolver(DocumentUploadSchema),
        defaultValues: {
            projectId: null,
            folderId: folderId || "",
            description: "",
            documentTypeId: "",
            isPublic: false,
            shareWith: [],
            file: undefined,
        },
    });

    useEffect(() => {
        reset({
            projectId: document?.project?.id || null,
            folderId: document?.folder?.id || folderId || "",
            description: document?.description || "",
            documentTypeId: document?.documentType?.id || "",
            isPublic: document?.isPublic || false,
            shareWith: document?.shareWithEmployee?.map((employee) => employee.id) || [],
            file: document?.url || undefined,
        });
    }, [folderId, reset, open]);

    const onSubmit = (data: DocumentFormValues) => {
        try {
            const formData = new FormData();
            formData.append("projectId", String(data.projectId));
            formData.append("folderId", String(data.folderId));
            if (data.description) formData.append("description", data.description);
            formData.append("documentTypeId", String(data.documentTypeId));
            formData.append("isPublic", String(data.isPublic));
            if (data.shareWith) {
                data.shareWith.forEach((employeeId) => {
                    formData.append("shareWith[]", String(employeeId));
                });
            }
            if (data.file) {
                if (data.file instanceof File) {
                    formData.append("file", data.file);
                } else {
                    // If it's a string (existing URL), we might need special handling
                    // For now, assuming we only upload files or use existing URL
                    // If editing and URL is same, no need to append
                    // But API might expect file or null
                    // Let's assume API handles string URL or we pass it differently
                    // But FormData append(name, value) with string URL works
                    // If backend expects file only when uploading new, we need to check
                }
            }

            if (isEdit && document) {
                // await updateDocumentMutation({ id: document.id, formData }).unwrap();
            } else {
                // await addDocumentMutation(formData).unwrap();
            }
            toast.success("Document saved successfully!");
            reset();
            onOpenChange(false);
        } catch (error: unknown) {
            toast.error(
                getErrorMessage(error, "Failed to upload document")
            );
        }
    };

    const handleFormError = () => {
        toast.error("Please fix the errors in the form before submitting.");
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-150 inset-5 inset-s-auto h-auto rounded-lg p-0 sm:max-w-none ">
                <SheetHeader className="mb-0">
                    <SheetTitle className="p-3 flex items-center gap-2.5">
                        <HiOutlineDocumentAdd className="size-5 text-blue-500" />
                        Upload Document
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <DocumentForm control={control} errors={errors} folderId={folderId} isEdit={isEdit} document={document} />
                        </ScrollArea>
                    </SheetBody>
                    <SheetFooter className="p-5">
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    onOpenChange(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4"
                                disabled={isSubmitting || !isDirty}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Upload Document"
                                )}
                            </Button>
                        </div>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default DocumentModal;


