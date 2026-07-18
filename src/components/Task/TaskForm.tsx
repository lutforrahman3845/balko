import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import SelectFormItem from "@/components/shared/SelectFormItem";
import CustomSelect from "@/components/shared/CustomSelect";
import { Employee, ExpandedEmployee} from "@/@types/employee";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TaskFormValues } from "@/@types/task";
export const PriorityOptions = [
  {
    value: "high",
    label: "High",
    state: "bg-red-500",
  },
  {
    value: "medium",
    label: "Medium",
    state: "bg-yellow-500",
  },
  {
    value: "low",
    label: "Low",
    state: "bg-green-500",
  },
];
export const StatusOptions = [
  {
    value: "pending",
    label: "Pending",
    state: "bg-yellow-500",
  },
  {
    value: "in_progress",
    label: "In Progress",
    state: "bg-blue-500",
  },
  {
    value: "completed",
    label: "Completed",
    state: "bg-green-500",
  },
  {
    value: "blocked",
    label: "Blocked",
    state: "bg-red-500",
  },
];
import { useGetEmployeesQuery } from "@/redux/apis/EmployeesApis";
import { useGetProjectsQuery } from "@/redux/apis/ProjectApis";
import { ExpandedProject, Project } from "@/@types/project";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TbHomeFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";

const TaskForm = ({
  control,
  errors,
  isEdit = false,
  data = [],
  currentProject = null,
}: {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  isEdit?: boolean;
  data?: Employee[];
  currentProject?: Project | null;
}) => {
  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchProject, setSearchProject] = useState("");

  const { data: employees, isLoading: loading } = useGetEmployeesQuery({
    searchQuery: searchEmployee,
    pageIndex: 1,
    pageSize: 20,
  });
  const { data: projects, isLoading: loadingProjects } = useGetProjectsQuery({
    searchQuery: searchProject,
    pageIndex: 1,
    pageSize: 20,
  });

  const projectOptions = useMemo(() => {
    const options: {
      value: string;
      searchText: string;
      label: React.ReactNode;
    }[] = [];

    if (isEdit && currentProject) {
      options.push({
        value: currentProject.id.toString(),
        searchText: currentProject.name,
        label: (
          <div className="flex items-center gap-3">
            <div className="flex flex-col min-w-0 font-medium">
              <span className="text-sm truncate flex items-center gap-1.5">
                {currentProject.type === "internal" ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-blue-500">
                        <TbHomeFilled className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>In-House Project</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-emerald-500">
                        <TiUser className="size-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Client Project</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {currentProject.name}
              </span>
            </div>
          </div>
        ),
      });
    }

    // Add fetched project options
    projects?.data?.forEach((project: ExpandedProject) => {
      if (
        !options.some(
          (opt: { value: string }) => opt.value === project.id.toString(),
        )
      ) {
        options.push({
          value: project.id.toString(),
          searchText: project.name,
          label: (
            <div className="flex items-center gap-3">
              <div className="flex flex-col min-w-0 font-medium">
                <span className="text-sm truncate flex items-center gap-1.5">
                  {project.type === "internal" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-blue-500">
                          <TbHomeFilled className="size-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>In-House Project</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-emerald-500">
                          <TiUser className="size-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Client Project</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {project.name}
                </span>
              </div>
            </div>
          ),
        });
      }
    });

    return options;
  }, [projects, currentProject, isEdit]);

  const employeeOptions = useMemo(() => {
    const options: {
      value: string;
      searchText: string;
      label: React.ReactNode;
    }[] = [];

    // In Edit Add currently assigned employees to the top
    if (isEdit && data && Array.isArray(data)) {
      data.forEach((emp: Employee) => {
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
        name="title"
        control={control}
        render={({ field }) => (
          <FormItem
            label={"Title"}
            inputType="text"
            placeholder={"Enter task title"}
            invalid={Boolean(errors.title)}
            errorMessage={errors.title?.message}
            {...field}
            required
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <FormItem
            label={"Description (optional)"}
            inputType="text"
            placeholder={"Enter task description"}
            invalid={Boolean(errors.content)}
            errorMessage={errors.content?.message}
            textarea={true}
            {...field}
          />
        )}
      />
      <Controller
        name="projectId"
        control={control}
        render={({ field }) => (
          <CustomSelect
            label="Project (optional)"
            placeholder="Select project"
            name={field.name}
            value={field?.value ? [field.value] : []}
            onChange={(vals) => field.onChange(vals?.[0] || null)}
            onSearch={setSearchProject}
            error={
              typeof errors?.projectId?.message === "string"
                ? errors?.projectId?.message
                : undefined
            }
            options={projectOptions}
            multiple={false}
            className="w-full"
            loading={loadingProjects}
          />
        )}
      />
      <Controller
        name="assignedEmployeeIds"
        control={control}
        render={({ field }) => (
          <CustomSelect
            label="Assign To"
            placeholder="Select employee"
            name={field.name}
            value={field?.value}
            onChange={(vals) => field.onChange(vals as string[])}
            onSearch={setSearchEmployee}
            error={
              typeof errors?.assignedEmployeeIds?.message === "string"
                ? errors?.assignedEmployeeIds?.message
                : undefined
            }
            options={employeeOptions}
            multiple={true}
            className="w-full"
            loading={loading}
            required
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <SelectFormItem
            onChange={(value: string) => {
              field.onChange(value);
            }}
            label={"Status"}
            placeholder={"Select task status"}
            invalid={Boolean(errors.status)}
            errorMessage={errors.status?.message}
            options={StatusOptions}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            dialCode={false}
            flags={false}
            key={field.value}
            required
          />
        )}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <SelectFormItem
            onChange={(value: string) => {
              field.onChange(value);
            }}
            label={"Priority"}
            placeholder={"Select task priority"}
            invalid={Boolean(errors.priority)}
            errorMessage={errors.priority?.message}
            options={PriorityOptions}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            dialCode={false}
            flags={false}
            key={field.value}
            required
          />
        )}
      />
      <Controller
        name="dueAt"
        control={control}
        render={({ field }) => (
          <FormItem
            label={"Due Date"}
            inputType="datetime-local"
            placeholder={"Select due date"}
            invalid={Boolean(errors.dueAt)}
            errorMessage={errors.dueAt?.message}
            {...field}
            value={
              field.value
                ? (() => {
                    const d = new Date(field.value);
                    const offset = d.getTimezoneOffset() * 60000;
                    return new Date(d.getTime() - offset)
                      .toISOString()
                      .slice(0, 16);
                  })()
                : ""
            }
            required
          />
        )}
      />
    </div>
  );
};

export default TaskForm;
