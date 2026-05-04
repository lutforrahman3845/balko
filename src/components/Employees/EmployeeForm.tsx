import { useMemo, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import SelectFormItem from "@/components/shared/SelectFormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { EmployeeFormValues, ExpandedSingleEmployee } from "@/@types/employee";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";
import { useGetRolesQuery } from "@/redux/apis/RoleAPis";
import EmployeeAvatar from "./EmployeeAvatar";
import { useGetTeamsQuery } from "@/redux/apis/TeamAPis";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const EmployeeTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contractor", label: "Contractor" },
  { value: "intern", label: "Intern" },
];

const EmployeeForm = ({
  control,
  errors,
  isEdit = false,
  data = null,
}: {
  control: Control<EmployeeFormValues>;
  errors: FieldErrors<EmployeeFormValues>;
  isEdit?: boolean;
  data?: ExpandedSingleEmployee | null;
}) => {
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const { data: departments, isLoading: loadingDepts } = useGetDepartmentQuery({
    searchQuery: departmentSearch,
    pageIndex: 1,
    pageSize: 20,
  });
  const { data: roles, isLoading: loadingRoles } = useGetRolesQuery({
    searchQuery: roleSearch,
    pageIndex: 1,
    pageSize: 20,
  });
  const { data: teams, isLoading: loadingTeams } = useGetTeamsQuery({
    searchQuery: teamSearch,
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

  const roleOptions = useMemo(() => {
    const options: {
      value: string;
      searchText: string;
      label: React.ReactNode;
    }[] = [];

    // In Edit mode, add the current role to the top
    if (isEdit && data?.role) {
      options.push({
        value: data.role.id,
        searchText: data.role.displayName,
        label: (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{data.role.displayName}</span>
            <span className="text-xs text-muted-foreground truncate max-w-sm">{data.role.description}</span>
          </div>
        ),
      });
    }

    // Add fetched roles
    roles?.data?.forEach((role) => {
      if (!options.some((opt) => opt.value === role.id)) {
        options.push({
          value: role.id,
          searchText: role.displayName,
          label: (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{role.displayName}</span>
              <span className="text-xs text-muted-foreground truncate max-w-sm">{role.description}</span>
            </div>
          ),
        });
      }
    });

    return options;
  }, [roles, data, isEdit]);

  // team option
  const teamOptions = useMemo(() => {
    const options: {
      value: string;
      searchText: string;
      label: React.ReactNode;
    }[] = [];

    // In Edit mode, add the current team to the top
    if (isEdit && data?.teams) {
      data?.teams.forEach((team) => {
        options.push({
          value: team.id,
          searchText: team.displayName,
          label: (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">{team.displayName}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Team Leader :</span>
                {team.teamLeader && (
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 shrink-0">
                      <AvatarImage src={team.teamLeader.avatar || undefined} />
                      <AvatarFallback>{team.teamLeader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate leading-tight">
                        {team.teamLeader.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {team.teamLeader.designation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
        });
      });
    }

    // Add fetched teams
    teams?.data?.forEach((team) => {
      if (!options.some((opt) => opt.value === team.id)) {
        options.push({
          value: team.id,
          searchText: team.displayName,
          label: (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">{team.displayName}</span>
              {team.teamLeader && (
                <div className="flex items-center gap-3">
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={team.teamLeader.avatar || undefined} />
                    <AvatarFallback>{team.teamLeader.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate leading-tight">
                      {team.teamLeader.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {team.teamLeader.designation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ),
        });
      }
    });

    return options;
  }, [teams, data, isEdit]);


  return (
    <div className="flex flex-col px-6 py-3 space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <EmployeeAvatar control={control} errors={errors} />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem
              label={"Full Name"}
              inputType="text"
              placeholder={"Enter full name"}
              invalid={Boolean(errors.name)}
              errorMessage={errors.name?.message}
              {...field}
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem
              label={"Email Address"}
              inputType="email"
              placeholder={"Enter email address"}
              invalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
              {...field}
              required
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <FormItem
              label={"Phone Number"}
              inputType="text"
              placeholder={"Enter phone number"}
              invalid={Boolean(errors.phone)}
              errorMessage={errors.phone?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <FormItem
              label={"Address"}
              inputType="text"
              placeholder={"Enter address"}
              invalid={Boolean(errors.address)}
              errorMessage={errors.address?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="designation"
          control={control}
          render={({ field }) => (
            <FormItem
              label={"Designation"}
              inputType="text"
              placeholder={"Enter designation"}
              invalid={Boolean(errors.designation)}
              errorMessage={errors.designation?.message}
              {...field}
              required
            />
          )}
        />

        <Controller
          name="employeeType"
          control={control}
          render={({ field }) => (
            <SelectFormItem
              onChange={(value: string) => field.onChange(value)}
              label={"Employee Type"}
              placeholder={"Select type"}
              invalid={Boolean(errors.employeeType)}
              errorMessage={errors.employeeType?.message}
              options={EmployeeTypeOptions}
              name={field.name}
              value={field.value || ""}
              required
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
          name="roleId"
          control={control}
          render={({ field }) => (
            <CustomeSelect
              label="Role"
              placeholder="Select role"
              name={field.name}
              value={field.value}
              onChange={(val) => field.onChange(val as string)}
              options={roleOptions}
              multiple={false}
              loading={loadingRoles}
              required
              error={errors.roleId}
              onSearch={setRoleSearch}
            />
          )}
        />

        <Controller
          name="teamIds"
          control={control}
          render={({ field }) => (
            <CustomeSelect
              label="Team"
              placeholder="Select team"
              name={field.name}
              value={field?.value || []}
              onChange={(val) => field.onChange(val as string[])}
              options={teamOptions}
              multiple={true}
              loading={loadingTeams}
              error={
                typeof errors?.teamIds?.message === "string"
                  ? errors?.teamIds?.message
                  : undefined
              }
              onSearch={setTeamSearch}
            />
          )}
        />
      </div>
    </div>
  );
};

export default EmployeeForm;
