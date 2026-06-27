import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { useMemo, useState } from "react";
import { ExpandFolder, FolderFormValues } from "@/@types/folder";
import { useGetFoldersQuery } from "@/redux/apis/folderApis";
import { getFolderIcon } from "@/lib/getIcons";
const iconNames = [
    "requirements",
    "design",
    "contracts",
    "organization",
    "documents",
    "folder",
    "project",
    "planning",
    "development",
    "database",
    "api",
    "frontend",
    "backend",
    "testing",
    "deployment",
    "security",
    "finance",
    "reports",
    "meeting",
    "assets",
    "media",
    "archive",
    "settings",
    "default",
];
const FolderForm = ({
    control,
    errors,
    isEdit = false,
    data = null,
}: {
    control: Control<FolderFormValues>;
    errors: FieldErrors<FolderFormValues>;
    isEdit?: boolean;
    data?: ExpandFolder | null;
}) => {
    const [search, setSearch] = useState("");
    const [searchIcon, setSearchIcon] = useState("");

    const { data: folders, isLoading: foldersLoading } = useGetFoldersQuery({
        searchQuery: search,
        page: 1,
        limit: 100,
    });

    const parentFolderOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit Add current parent to top
        if (isEdit && data?.parentFolder) {
            const parent = data.parentFolder;
            options.push({
                value: parent.id.toString(),
                searchText: parent.name,
                label: (
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center transform scale-75">
                            {getFolderIcon(parent.icon)}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate leading-tight capitalize">
                                {parent.name}
                            </p>
                        </div>
                    </div>
                ),
            });
        }

        folders?.data?.forEach((folder: ExpandFolder) => {
            // Prevent selecting itself as parent in edit mode
            if (isEdit && folder.id === data?.id) return;

            if (!options.some((opt) => opt.value === folder.id.toString())) {
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
            }
        });

        return options;
    }, [folders, data, isEdit]);


    const iconsOption = iconNames
        .filter((name) => name.toLowerCase().includes(searchIcon.toLowerCase()))
        .map((name) => ({
        value: name,
        searchText: name,
        label: (
            <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center transform scale-75">
                    {getFolderIcon(name)}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate leading-tight capitalize">
                        {name}
                    </p>
                </div>
            </div>
        ),
    }));
    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Folder Name"}
                        inputType="text"
                        placeholder={"Enter folder name"}
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
                        maxLength={100}
                        {...field}
                        required
                    />
                )}
            />
            <Controller
                name="icon"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Icon (optional)"
                        placeholder="Select icon"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        error={errors?.icon?.message}
                        options={iconsOption}
                        multiple={false}
                        onSearch={setSearchIcon}
                        className="w-full"
                    />
                )}
            />
            <Controller
                name="parentFolderId"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Parent Folder (optional)"
                        placeholder="Select parent folder"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        onSearch={setSearch}
                        error={errors?.parentFolderId?.message}
                        options={parentFolderOptions}
                        multiple={false}
                        className="w-full"
                        loading={foldersLoading}
                    />
                )}
            />
        </div>
    );
};

export default FolderForm;
