import { Control, Controller, FieldErrors } from "react-hook-form";
import FormItem from "@/components/shared/FormItem";
import SelectFormItem from "@/components/shared/SelectFormItem";
import CustomeSelect from "@/components/shared/CustomeSelect";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Employee, ExpandedEmployee, GetEmployee } from "@/@types/employee";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TaskFormValues } from "@/@types/tassk";
export const PriorityOptions = [
  {
    value: 'high',
    label: 'High',
    state: 'bg-red-500',
  },
  {
    value: 'medium',
    label: 'Medium',
    state: 'bg-yellow-500',
  },
  {
    value: 'low',
    label: 'Low',
    state: 'bg-green-500',
  },
];
export const StatusOptions = [
  {
    value: 'pending',
    label: 'Pending',
    state: 'bg-yellow-500',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    state: 'bg-blue-500',
  },
  {
    value: 'completed',
    label: 'Completed',
    state: 'bg-green-500',
  },
  {
    value: 'blocked',
    label: 'Blocked',
    state: 'bg-red-500',
  },
];
const TaskForm = ({
  control,
  errors,
  isEdit = false,
  data = [],
}: {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  isEdit?: boolean;
  data?: Employee[];
}) => {
  const [searchEmployee, setSearchEmployee] = useState("");

  const { data: employees, isLoading: loading } = useQuery<GetEmployee>({
    queryKey: ["employee", searchEmployee],
    queryFn: async () => {
      const params = new URLSearchParams({
        searchQuery: searchEmployee,
        pageIndex: "1",
        pageSize: "20",
      });

      const response = await fetch(`/api/employee?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch emplyee");
      }
      return response.json();
    },
    placeholderData: keepPreviousData,
  });

  const employeeOptions = useMemo(() => {
    const options: { value: string, searchText: string, label: React.ReactNode }[] = [];

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
        name="assignedEmployeeIds"
        control={control}
        render={({ field }) => (
          <CustomeSelect
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
          />
        )}
      />
    </div>
  );
};

export default TaskForm;
