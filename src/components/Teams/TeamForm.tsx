import { ExpandedEmployee } from "@/@types/employee";
import { ExpandedSingleTeam, TeamFormValues } from "@/@types/team";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";
import { useGetEmployeesQuery } from "@/redux/apis/EmployeesApis";
import { useMemo, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FormItem from "../shared/FormItem";
import CustomeSelect from "../shared/CustomeSelect";

const TeamForm = ({ control,
    errors,
    isEdit = false,
    data = null, }: {
        control: Control<TeamFormValues>;
        errors: FieldErrors<TeamFormValues>;
        isEdit?: boolean;
        data?: ExpandedSingleTeam | null;
    }) => {
    const [departmentSearch, setDepartmentSearch] = useState("");
    const { data: departments, isLoading: loadingDepts } = useGetDepartmentQuery({
        searchQuery: departmentSearch,
        pageIndex: 1,
        pageSize: 20,
    });
    const departmentOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit mode, add the current department to the top
        if (isEdit && data?.department) {
            options.push({
                value: data.department.id,
                searchText: data.department.displayName,
                label: (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{data.department.displayName}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-sm">{data.department.description}</span>
                    </div>
                ),
            });
        }

        // Add fetched departments
        departments?.data?.forEach((dept) => {
            if (!options.some((opt) => opt.value === dept.id)) {
                options.push({
                    value: dept.id,
                    searchText: dept.displayName,
                    label: (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{dept.displayName}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-sm">{dept.description}</span>
                        </div>
                    ),
                });
            }
        });

        return options;
    }, [departments, data, isEdit]);

    const [searchEmployee, setSearchEmployee] = useState("");

    const { data: employees, isLoading: loading } = useGetEmployeesQuery({
        searchQuery: searchEmployee,
        pageIndex: 1,
        pageSize: 20,
    });

    const teamLeaderOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit Add currently assigned employees to the top
        if (isEdit && data && data.teamLeader) {
            const emp = data.teamLeader;
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
        // Add fetched employee options
        employees?.data?.forEach((emp: ExpandedEmployee) => {
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
    }, [employees, data, isEdit]);
    const teamEmployeeOptions = useMemo(() => {
        const options: {
            value: string;
            searchText: string;
            label: React.ReactNode;
        }[] = [];

        // In Edit Add currently assigned employees to the top
        if (isEdit && data && data.teamMembers?.length > 0) {
            data.teamMembers.forEach((emp: ExpandedEmployee) => {
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
        employees?.data?.forEach((emp: ExpandedEmployee) => {
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
    }, [employees, data, isEdit]);

    return (
        <div className="flex flex-col px-6 py-3 space-y-6">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <FormItem
                        label={"Team Name"}
                        inputType="text"
                        placeholder={"Enter team name"}
                        invalid={Boolean(errors.name)}
                        errorMessage={errors.name?.message}
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
                        label={"Description"}
                        inputType="text"
                        placeholder={"Enter description"}
                        invalid={Boolean(errors.description)}
                        errorMessage={errors.description?.message}
                        maxLength={100}
                        textarea={true}
                        {...field}
                    />
                )}
            />
            <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Department"
                        placeholder="Select department"
                        name={field.name}
                        value={field.value}
                        onChange={(val) => field.onChange(val as string)}
                        options={departmentOptions}
                        multiple={false}
                        loading={loadingDepts}
                        required
                        error={errors.departmentId}
                        onSearch={setDepartmentSearch}
                    />
                )}
            />
            <Controller
                name="teamLeaderId"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Team Leader"
                        placeholder="Select team leader"
                        name={field.name}
                        value={field.value}
                        onChange={(val) => field.onChange(val as string)}
                        options={teamLeaderOptions}
                        multiple={false}
                        loading={loadingDepts}
                        required
                        error={errors.teamLeaderId}
                        onSearch={setSearchEmployee}
                    />
                )}
            />
            <Controller
                name="teamMembers"
                control={control}
                render={({ field }) => (
                    <CustomeSelect
                        label="Team Members"
                        placeholder="Select team members"
                        name={field.name}
                        value={field.value}
                        onChange={(val) => field.onChange(val as string)}
                        options={teamEmployeeOptions}
                        multiple={true}
                        loading={loadingDepts}
                        error={
                            typeof errors?.teamMembers?.message === "string"
                                ? errors?.teamMembers?.message
                                : undefined
                        }
                        onSearch={setSearchEmployee}
                    />
                )}
            />
        </div>
    );
};

export default TeamForm;