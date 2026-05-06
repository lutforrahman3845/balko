import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { ExpandedEmployee } from "@/@types/employee";
import { ExpandedDepartment, DepartmentFormValues } from "@/@types/department";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetEmployeesQuery } from "@/redux/apis/EmployeesApis";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";

const DepartmentForm = ({
    control,
    errors,
    isEdit = false,
    data = null,
}: {
    control: Control<DepartmentFormValues>;
    errors: FieldErrors<DepartmentFormValues>;
    isEdit?: boolean;
    data?: ExpandedDepartment | null;
}) => {
    const [searchEmployee, setSearchEmployee] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");

    const { data: employees, isLoading: loadingEmployees } = useGetEmployeesQuery({
        searchQuery: searchEmployee,
        pageIndex: 1,
        pageSize: 20,
    });

    const { data: departments, isLoading: loadingDepartments } = useGetDepartmentQuery({
        searchQuery: searchDepartment,
        pageIndex: 1,
        pageSize: 20,
    });

    const employeeOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit Add current head to the top if not in fetched list
        if (isEdit && data?.departmentHead) {
            const head = data.departmentHead;
            options.push({
                value: head.id.toString(),
                searchText: head.name,
                label: (
                    <div className="flex items-center gap-3 w-full">
                        <Avatar className="size-8 shrink-0">
                            <AvatarImage src={head.avatar || undefined} />
                            <AvatarFallback>{head.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate leading-tight">
                                {head.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {head.designation}
                            </p>
                        </div>
                    </div>
                ),
            });
        }

        employees?.data?.forEach((emp: ExpandedEmployee) => {
            if (!options.some((opt) => opt.value === emp.id.toString())) {
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
    }, [employees, data, isEdit]);

    const departmentOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit Add current parent to top
        if (isEdit && data?.parentDepartment) {
            const parent = data.parentDepartment;
            options.push({
                value: parent.id.toString(),
                searchText: parent.displayName,
                label: (
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate leading-tight">
                                {parent.displayName}
                            </p>
                        </div>
                    </div>
                ),
            });
        }

        departments?.data?.forEach((dept: ExpandedDepartment) => {
            // Prevent selecting itself as parent in edit mode
            if (isEdit && dept.id === data?.id) return;

            if (!options.some((opt) => opt.value === dept.id.toString())) {
                options.push({
                    value: dept.id.toString(),
                    searchText: dept.displayName,
                    label: (
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex flex-col min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate leading-tight">
                                    {dept.displayName}
                                </p>
                            </div>
                        </div>
                    ),
                });
            }
        });

        return options;
    }, [departments, data, isEdit]);

    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Department Name"}
                        inputType="text"
                        placeholder={"Enter department name"}
                        invalid={Boolean(errors.displayName)}
                        errorMessage={errors.displayName?.message}
                        maxLength={100}
                        {...field}
                        required
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Description (optional)"}
                        inputType="text"
                        placeholder={"Enter department description"}
                        invalid={Boolean(errors.description)}
                        errorMessage={errors.description?.message}
                        textarea={true}
                        {...field}
                    />
                )}
            />
            <Controller
                name="departmentHeadId"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Department Head (optional)"
                        placeholder="Select department head"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        onSearch={setSearchEmployee}
                        error={errors?.departmentHeadId?.message}
                        options={employeeOptions}
                        multiple={false}
                        className="w-full"
                        loading={loadingEmployees}
                    />
                )}
            />
            <Controller
                name="parentDepartmentId"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Parent Department (optional)"
                        placeholder="Select parent department"
                        name={field.name}
                        value={field?.value || ""}
                        onChange={(val) => field.onChange(val as string)}
                        onSearch={setSearchDepartment}
                        error={errors?.parentDepartmentId?.message}
                        options={departmentOptions}
                        multiple={false}
                        className="w-full"
                        loading={loadingDepartments}
                    />
                )}
            />
        </div>
    );
};

export default DepartmentForm;
