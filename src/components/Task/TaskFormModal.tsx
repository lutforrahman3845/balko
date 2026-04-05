"use client";

import { useEffect } from "react";
import { ExpandedTask, TaskFormSchema, TaskFormValues } from "@/@types/tassk";
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
import { CheckSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import TaskForm from "./TaskForm";
interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  data?: ExpandedTask | null;
  selectedId?: string | null;
}

const TaskFormModal = ({
  open,
  onOpenChange,
  isEdit = false,
  data = null,
  selectedId = null,
}: TaskFormProps) => {
  // Form State
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      content: "",
      assignedEmployeeIds: [],
      status: "pending",
      priority: "medium",
      dueAt: "",
    },
  });

  useEffect(() => {
    if (data && isEdit) {
      reset({
        title: data.title,
        content: data.content || "",
        assignedEmployeeIds: data.assignedEmployeeIds || [],
        status: data?.status || "pending",
        priority: data?.priority,
        dueAt: data?.dueAt,
      });
    } else {
      reset({
        title: "",
        content: "",
        assignedEmployeeIds: [],
        status: "pending",
        priority: "medium",
        dueAt: "",
      });
    }
  }, [data, isEdit, reset]);
  const onSubmit = (data: TaskFormValues) => {
    try {
      console.log(data);
      if (!isEdit) {
        console.log("Edit id :", selectedId);
        toast.success("Task created successfully!");
      } else {
        toast.success("Task updated successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.message ??
        (isEdit ? "Failed to update task" : "Failed to create task"),
      );
    } finally {
      reset();
      onOpenChange(false);
    }
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
              <TaskForm
                control={control}
                errors={errors}
                isEdit={isEdit}
                data={data?.assignedEmployees || []}
              />
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
                ) : isEdit ? (
                  "Update Task"
                ) : (
                  "Save Task"
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TaskFormModal;
