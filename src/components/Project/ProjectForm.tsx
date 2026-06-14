import { useMemo, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import SelectFormItem from "@/components/shared/SelectFormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { ProjectFormValues, SingleProject } from "@/@types/project";
import { useGetDepartmentQuery } from "@/redux/apis/DepartmentAPis";
import { useGetTeamsQuery } from "@/redux/apis/TeamAPis";
import { useGetEmployeesQuery } from "@/redux/apis/EmployeesApis";
import { useGetCompaniesQuery } from "@/redux/apis/CompaniesApis";
import { useGetContactsQuery } from "@/redux/apis/ConatctAPis";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ExpandedSingleTeam } from "@/@types/team";
import { ExpandedEmployee } from "@/@types/employee";
import { ExpandedCompany } from "@/@types/company";
import { ExpandedContact } from "@/@types/contact";
import { currency } from "@/config/currency";

const TypeOptions = [
  { value: "client", label: "Client Project" },
  { value: "internal", label: "Internal Project" },
];

const StatusOptions = [
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PriorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const ProjectForm = ({
  control,
  errors,
  isEdit = false,
  data = null,
}: {
  control: Control<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  isEdit?: boolean;
  data?: SingleProject | null;
}) => {
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const [managerSearch, setManagerSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");

  const { data: departments, isLoading: loadingDepts } = useGetDepartmentQuery({
    searchQuery: departmentSearch,
    pageIndex: 1,
    pageSize: 20,
  });

  const { data: teams, isLoading: loadingTeams } = useGetTeamsQuery({
    searchQuery: teamSearch,
    pageIndex: 1,
    pageSize: 20,
  });

  const { data: employees, isLoading: loadingEmployees } = useGetEmployeesQuery({
    searchQuery: managerSearch,
    pageIndex: 1,
    pageSize: 20,
  });

  const { data: companies, isLoading: loadingCompanies } = useGetCompaniesQuery({
    searchQuery: companySearch,
    pageIndex: 1,
    pageSize: 20,
  });

  const { data: contacts, isLoading: loadingContacts } = useGetContactsQuery({
    searchQuery: contactSearch,
    pageIndex: 1,
    pageSize: 20,
  });

  // Departments Options
  const departmentOptions = useMemo(() => {
    const options: { value: string; searchText: string; label: React.ReactNode }[] = [];
    if (isEdit && data?.department) {
      options.push({
        value: data?.department?.id,
        searchText: data?.department?.displayName || data?.department?.name || "",
        label: (
          <span className="text-sm font-medium">
            {data?.department?.displayName || data?.department?.name}
          </span>
        ),
      });
    }
    departments?.data?.forEach((dept) => {
      if (!options.some((opt) => opt.value === dept.id)) {
        options.push({
          value: dept.id,
          searchText: dept?.displayName || dept?.name || "",
          label: (
            <span className="text-sm font-medium">
              {dept?.displayName || dept?.name}
            </span>
          ),
        });
      }
    });
    return options;
  }, [departments, data, isEdit]);

  // Teams Options
  const teamOptions = useMemo(() => {
    const options: { value: string; searchText: string; label: React.ReactNode }[] = [];
    if (isEdit && data?.teams) {
      data?.teams?.forEach((team: ExpandedSingleTeam) => {
        options.push({
          value: team.id,
          searchText: team?.displayName || team?.name || "",
          label: (
            <span className="text-sm font-medium">
              {team?.displayName || team?.name}
            </span>
          ),
        });
      });
    }
    teams?.data?.forEach((team) => {
      if (!options.some((opt) => opt.value === team.id)) {
        options.push({
          value: team.id,
          searchText: team?.displayName || team?.name || "",
          label: (
            <span className="text-sm font-medium">
              {team?.displayName || team?.name}
            </span>
          ),
        });
      }
    });
    return options;
  }, [teams, data, isEdit]);

  // Managers Options
  const managerOptions = useMemo(() => {
    const options: { value: string; searchText: string; label: React.ReactNode }[] = [];
    if (isEdit && data?.manager) {
      options.push({
        value: data?.manager?.id,
        searchText: data?.manager?.name || "",
        label: (
          <div className="flex items-center gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={data?.manager?.avatar || undefined} />
              <AvatarFallback>{data?.manager?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{data?.manager?.name}</p>
              <p className="text-xs text-muted-foreground">{data?.manager?.designation}</p>
            </div>
          </div>
        ),
      });
    }
    employees?.data?.forEach((emp: ExpandedEmployee) => {
      if (!options.some((opt) => opt.value === emp.id)) {
        options.push({
          value: emp.id,
          searchText: emp?.name || "",
          label: (
            <div className="flex items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={emp?.avatar || undefined} />
                <AvatarFallback>{emp?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{emp?.name}</p>
                <p className="text-xs text-muted-foreground">{emp?.designation}</p>
              </div>
            </div>
          ),
        });
      }
    });
    return options;
  }, [employees, data, isEdit]);

  // Companies Options
  const companyOptions = useMemo(() => {
    const options: { value: string; searchText: string; label: React.ReactNode }[] = [];
    if (isEdit && data?.company) {
      options.push({
        value: data.company.id,
        searchText: data.company.name,
        label: <div className="flex items-center gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={data?.company?.logo || undefined} />
            <AvatarFallback>{data?.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-sm font-medium leading-tight">{data?.company?.name}</p>
            <p className="text-xs text-muted-foreground">{data?.company?.phone}</p>
          </div>
        </div>,
      });
    }
    companies?.data?.forEach((comp: ExpandedCompany) => {
      if (!options.some((opt) => opt.value === comp.id)) {
        options.push({
          value: comp.id,
          searchText: comp.name,
          label: <div className="flex items-center gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={comp?.logo || undefined} />
              <AvatarFallback>{comp?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{comp?.name}</p>
              <p className="text-xs text-muted-foreground">{comp?.phone}</p>
            </div>
          </div>
        });
      }
    });
    return options;
  }, [companies, data, isEdit]);

  // Contacts Options
  const contactOptions = useMemo(() => {
    const options: { value: string; searchText: string; label: React.ReactNode }[] = [];
    if (isEdit && data?.contactPerson) {
      options.push({
        value: data.contactPerson.id,
        searchText: data.contactPerson.name,
        label: (
          <div className="flex items-center gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={data?.contactPerson?.avatar || undefined} />
              <AvatarFallback>{data?.contactPerson?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{data?.contactPerson?.name}</p>
              <p className="text-xs text-muted-foreground">{data?.contactPerson?.email}</p>
            </div>
          </div>
        ),
      });
    }
    contacts?.data?.forEach((contact: ExpandedContact) => {
      if (!options.some((opt) => opt.value === contact.id)) {
        options.push({
          value: contact.id,
          searchText: contact.name,
          label: (
            <div className="flex items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={contact?.avatar || undefined} />
                <AvatarFallback>{contact?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{contact?.name}</p>
                <p className="text-xs text-muted-foreground">{contact?.email}</p>
              </div>
            </div>
          ),
        });
      }
    });
    return options;
  }, [contacts, data, isEdit]);

  return (
    <div className="flex flex-col space-y-8">
      {/* General Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">General Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormItem
                label="Project Name"
                inputType="text"
                placeholder="Enter project name"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
                {...field}
                required
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <SelectFormItem
                onChange={(value: string) => field.onChange(value)}
                label="Project Type"
                placeholder="Select type"
                invalid={Boolean(errors.type)}
                errorMessage={errors.type?.message}
                options={TypeOptions}
                name={field.name}
                value={field.value || ""}
                required
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectFormItem
                onChange={(value: string) => field.onChange(value)}
                label="Status"
                placeholder="Select status"
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message}
                options={StatusOptions}
                name={field.name}
                value={field.value || ""}
                required
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <SelectFormItem
                onChange={(value: string) => field.onChange(value)}
                label="Priority"
                placeholder="Select priority"
                invalid={Boolean(errors.priority)}
                errorMessage={errors.priority?.message}
                options={PriorityOptions}
                name={field.name}
                value={field.value || ""}
                required
              />
            )}
          />
          <div className="md:col-span-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormItem
                  label="Description"
                  inputType="textarea"
                  placeholder="Enter project description"
                  invalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                  {...field}
                  required
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Dates & Financials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Dates & Financials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <FormItem
                label="Start Date"
                inputType="date"
                invalid={Boolean(errors.startDate)}
                errorMessage={errors.startDate?.message}
                {...field}
                required
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <FormItem
                label="End Date"
                inputType="date"
                invalid={Boolean(errors.endDate)}
                errorMessage={errors.endDate?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <FormItem
                label="Budget"
                inputType="number"
                placeholder="Enter budget"
                invalid={Boolean(errors.budget)}
                errorMessage={errors.budget?.message}
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <SelectFormItem
                onChange={(value: string) => field.onChange(value)}
                label="Currency"
                placeholder="Select"
                invalid={Boolean(errors.currency)}
                errorMessage={errors.currency?.message}
                options={currency}
                name={field.name}
                value={field.value || ""}
                key={field.value}
              />
            )}
          />
        </div>
      </div>

      {/* Teams & Stakeholders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Teams & Stakeholders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="managerId"
            control={control}
            render={({ field }) => (
              <CustomeSelect
                label="Project Manager"
                placeholder="Select manager"
                name={field.name}
                value={field.value}
                onChange={(val) => field.onChange(val as string)}
                options={managerOptions}
                multiple={false}
                loading={loadingEmployees}
                required
                error={errors.managerId}
                onSearch={setManagerSearch}
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
                value={field.value || ""}
                onChange={(val) => field.onChange(val as string)}
                options={departmentOptions}
                multiple={false}
                loading={loadingDepts}
                error={errors.departmentId}
                onSearch={setDepartmentSearch}
              />
            )}
          />
          <Controller
            name="companyId"
            control={control}
            render={({ field }) => (
              <CustomeSelect
                label="Client / Company"
                placeholder="Select company"
                name={field.name}
                value={field.value || ""}
                onChange={(val) => field.onChange(val as string)}
                options={companyOptions}
                multiple={false}
                loading={loadingCompanies}
                error={errors.companyId}
                onSearch={setCompanySearch}
              />
            )}
          />
          <Controller
            name="contactPersonId"
            control={control}
            render={({ field }) => (
              <CustomeSelect
                label="Contact Person"
                placeholder="Select contact"
                name={field.name}
                value={field.value || ""}
                onChange={(val) => field.onChange(val as string)}
                options={contactOptions}
                multiple={false}
                loading={loadingContacts}
                error={errors.contactPersonId}
                onSearch={setContactSearch}
              />
            )}
          />
          <div className="md:col-span-2">
            <Controller
              name="teamIds"
              control={control}
              render={({ field }) => (
                <CustomeSelect
                  label="Assigned Teams"
                  placeholder="Select teams"
                  name={field.name}
                  value={field?.value || []}
                  onChange={(val) => field.onChange(val as string[])}
                  options={teamOptions}
                  multiple={true}
                  loading={loadingTeams}
                  required
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
      </div>
    </div>
  );
};

export default ProjectForm;
