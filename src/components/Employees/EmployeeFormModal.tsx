"use client";

import { useEffect } from "react";
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
import { EmployeeFormSchema, EmployeeFormValues, ExpandedSingleEmployee } from "@/@types/employee";
import { TiUserAdd } from "react-icons/ti";
import EmployeeForm from "./EmployeeForm";
import { useGetEmployeeByIdQuery } from "@/redux/apis/EmployeesApis";
interface EmployeeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  selectedId?: string | null;
}

const EmployeeFormModal = ({
  open,
  onOpenChange,
  isEdit = false,
  selectedId = null,
}: EmployeeFormModalProps) => {

  const { data: employeeData, isLoading: employeeDataLoading } = useGetEmployeeByIdQuery(selectedId as string, { skip: !open || !isEdit && !selectedId })
  const data = employeeData?.data as ExpandedSingleEmployee;
  // Form State
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      avatar: null,
      name: "",
      email: "",
      phone: "",
      address: "",
      designation: "",
      employeeType: "full_time",
      departmentId: "",
      roleId: "",
      teamIds: null,
    },
  });

  useEffect(() => {
    if (data && isEdit) {
      reset({
        avatar: data.avatar || null,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        designation: data.designation || "",
        employeeType: data.employeeType || "full_time",
        departmentId: data.departmentId || "",
        roleId: data.roleId || "",
        teamIds: data?.teams?.map((team) => team.id) || null,
      });
    } else {
      reset({
        avatar: null,
        name: "",
        email: "",
        phone: "",
        address: "",
        designation: "",
        employeeType: "full_time",
        departmentId: "",
        roleId: "",
        teamIds: null,
      });
    }
  }, [data, isEdit, reset]);
  const onSubmit = (data: EmployeeFormValues) => {
    try {
      console.log(data);
      if (!isEdit) {
        console.log("Edit id :", selectedId);
        toast.success("Employee created successfully!");
      } else {
        toast.success("Employee updated successfully!");
      }
      reset();
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.message ??
        (isEdit ? "Failed to update employee" : "Failed to create employee"),
      );
    }
  };
  const handleFormError = () => {
    toast.error("Please fix the errors in the form before submitting.");
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 sm:w-150 inset-5 inset-s-auto h-auto rounded-lg p-0 sm:max-w-none ">
        <SheetHeader className="mb-0">
          <SheetTitle className="p-3 flex items-center gap-2.5">
            <TiUserAdd className="size-6 text-blue-500" />
            {isEdit ? "Update Employee" : "New Employee"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
          <SheetBody className="grow p-0">
            <ScrollArea className="h-[calc(100vh-10.5rem)]">
              <EmployeeForm
                control={control}
                errors={errors}
                data={data}
                isEdit={isEdit}
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
                  "Update Employee"
                ) : (
                  "Save Employee"
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeFormModal;
