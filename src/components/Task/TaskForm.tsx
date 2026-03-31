"use client";

import { TaskFormSchema, TaskFormValues } from "@/@types/tassk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
  SheetFooter,
} from "@/components/ui/sheet";
import { CheckSquare } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import FormItem from "../shared/FormItem";
import SelectFormItem from "../shared/SelectFormItem";
export const PriorityOptions = [
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];
export const StatusOptions = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];
interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskForm = ({ open, onOpenChange }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      content: "",
      assignedContactIds: [],
      status: "pending",
      priority: "medium",
      dueAt: "",
    },
  });
  const onSubmit = (data: TaskFormValues) => {
    console.log(data);
  };
  const handleFormError = () => {
    toast.error("Please fix the errors in the form before submitting.");
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 sm:w-150 inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none ">
        <SheetHeader className="mb-0">
          <SheetTitle className="p-3 flex items-center gap-2.5">
            <div className="size-5 rounded border border-blue-500/50 flex items-center justify-center bg-blue-500/10">
              <CheckSquare className="size-3.5 text-blue-500" />
            </div>
            New Task
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
          <SheetBody className="grow p-0">
            <ScrollArea className="h-[calc(100vh-10.5rem)]">
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
                      label={"Content (Description)"}
                      inputType="text"
                      placeholder={"Enter task content"}
                      invalid={Boolean(errors.content)}
                      errorMessage={errors.content?.message}
                      textarea={true}
                      {...field}
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
                    />
                  )}
                />
              </div>
            </ScrollArea>
          </SheetBody>
          <SheetFooter className="p-5">
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4"
              >
                Save Task
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TaskForm;
