import { Control, Controller, FieldErrors } from "react-hook-form";
import CustomSelect from "@/components/shared/CustomSelect";
import { DocumentFormValues } from "@/@types/folder";
import { useGetFoldersQuery } from "@/redux/apis/folderApis";
import { getFolderIcon } from "@/lib/getIcons";
import { useState, useMemo } from "react";
import { ExpandFolder, FolderDocument } from "@/@types/folder";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGetDocumentTypesQuery } from "@/redux/apis/DocumentApis";
import { useGetProjectsQuery } from "@/redux/apis/ProjectApis";
import { useGetEmployeesQuery } from "@/redux/apis/EmployeesApis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormItem from "../shared/FormItem";
import FileUpload from "../shared/FileUpload";


const DocumentForm = ({
    control,
    errors,
    folderId,
    isEdit,
    document,
}: {
    control: Control<DocumentFormValues>;
    errors: FieldErrors<DocumentFormValues>;
    folderId?: string;
    isEdit?: boolean;
    document?: FolderDocument
}) => {
    const [searchFolder, setSearchFolder] = useState("");
    const [searchProject, setSearchProject] = useState("");
    const [searchEmployee, setSearchEmployee] = useState("");

    const { data: folders, isLoading: foldersLoading } = useGetFoldersQuery({
        searchQuery: searchFolder,
        page: 1,
        limit: 100,
    });
    const { data: docTypesRes, isLoading: loadingTypes } = useGetDocumentTypesQuery();
    const docTypes = docTypesRes?.data || [];
    const { data: projects, isLoading: loadingProjects } = useGetProjectsQuery({
        searchQuery: searchProject,
        pageIndex: 1,
        pageSize: 200,
    });
    const { data: employees, isLoading: loadingEmployees } = useGetEmployeesQuery({
        searchQuery: searchEmployee,
        pageIndex: 1,
        pageSize: 200,
    });
    const folderOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        folders?.data?.forEach((folder: ExpandFolder) => {
            options.push({
                value: folder.id.toString(),
                searchText: folder.name,
                label: (
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center transform scale-75">
                            {getFolderIcon(folder.icon)}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate leading-tight capitalize">
                                {folder.name}
                            </p>
                        </div>
                    </div>
                ),
            });
        });

        isEdit && document?.folder && options.unshift({
            value: document?.folderId?.toString(),
            searchText: document?.folder?.name,
            label: (
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center transform scale-75">
                        {getFolderIcon(document?.folder?.icon)}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate leading-tight capitalize">
                            {document?.folder?.name}
                        </p>
                    </div>
                </div>
            ),
        });

        return options;
    }, [folders, isEdit, document]);
    const docTypeOptions = useMemo(() => {
        return docTypes.map((dt: any) => ({
            value: dt.id.toString(),
            label: dt.name,
        }));
    }, [docTypes]);

    const projectOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        if (isEdit && document?.project) {
            options.push({
                value: document.project.id.toString(),
                searchText: document.project.name,
                label: (
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate leading-tight">
                                {document.project.name}
                            </p>
                        </div>
                    </div>
                ),
            });
        }

        // Add all fetched projects
        (projects?.data || []).forEach((p: any) => {
            if (
                !options.some(
                    (opt: { value: string }) => opt.value === p.id.toString(),
                )
            ) {
                options.push({
                    value: p.id.toString(),
                    searchText: p.name,
                    label: (
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex flex-col min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                    {p.name}
                                </p>
                            </div>
                        </div>
                    ),
                });
            }
        });

        return options;
    }, [projects, document, isEdit]);


    const employeeOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        if (isEdit && document?.shareWithEmployee) {
            document.shareWithEmployee.forEach((emp: any) => {
                options.push({
                    value: emp.id.toString(),
                    searchText: emp.name,
                    label: (
                        <div className="flex items-center gap-3 w-full">
                            <Avatar className="size-8 shrink-0">
                                <AvatarImage src={emp.avatar || undefined} />
                                <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                    {emp.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {emp.designation}
                                </p>
                            </div>
                        </div>
                    ),
                });
            });
        }

        // Add fetched employee options
        employees?.data?.forEach((emp: any) => {
            if (
                !options.some(
                    (opt: { value: string }) => opt.value === emp.id.toString(),
                )
            ) {
                options.push({
                    value: emp.id.toString(),
                    searchText: emp.name,
                    label: (
                        <div className="flex items-center gap-3 w-full">
                            <Avatar className="size-8 shrink-0">
                                <AvatarImage src={emp.avatar || undefined} />
                                <AvatarFallback>{emp.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                    {emp.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {emp.designation}
                                </p>
                            </div>
                        </div>
                    ),
                });
            }
        });

        return options;
    }, [employees, document, isEdit]);
    return (
        <div className="flex flex-col px-6 py-3 space-y-6">

            <Controller
                name="file"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <FileUpload
                        file={value as File | string | undefined}
                        onChange={onChange}
                        error={errors.file?.message as string | undefined}
                    />
                )}
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
            {!folderId &&
                <Controller
                    name="folderId"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            label="Folder"
                            placeholder="Select folder"
                            name={field.name}
                            value={field?.value || ""}
                            onChange={(val) => field.onChange(val as string)}
                            onSearch={setSearchFolder}
                            error={errors?.folderId?.message}
                            options={folderOptions}
                            multiple={false}
                            className="w-full"
                            loading={foldersLoading}
                        />
                    )}
                />
            }

            <Controller
                name="projectId"
                control={control}
                render={({ field }) => (
                    <CustomSelect
                        label="Project (optional)"
                        placeholder="Select project"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        error={errors?.projectId?.message}
                        options={projectOptions}
                        multiple={false}
                        className="w-full"
                        loading={loadingProjects}
                        onSearch={setSearchProject}
                    />
                )}
            />

            <Controller
                name="documentTypeId"
                control={control}
                render={({ field }) => (
                    <CustomSelect
                        label="Document Type"
                        placeholder="Select document type"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        error={errors?.documentTypeId?.message}
                        options={docTypeOptions}
                        multiple={false}
                        className="w-full"
                        loading={loadingTypes}
                    />
                )}
            />

            <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="isPublic"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="isPublic">Make Document Public</Label>
                    </div>
                )}
            />

            <Controller
                name="shareWith"
                control={control}
                render={({ field }) => (
                    <CustomSelect
                        label="Share With Employees (optional)"
                        placeholder="Select employees"
                        name={field.name}
                        value={field?.value?.map(String) || []}
                        onChange={(val) => field.onChange(Array.isArray(val) ? val.map(Number) : [Number(val)])}
                        error={errors?.shareWith?.message}
                        options={employeeOptions}
                        multiple={true}
                        className="w-full"
                        loading={loadingEmployees}
                        onSearch={setSearchEmployee}
                    />
                )}
            />
        </div>
    );
};

export default DocumentForm;
