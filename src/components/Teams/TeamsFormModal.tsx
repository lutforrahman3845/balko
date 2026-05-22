"use client";

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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ExpandedSingleTeam,
  TeamFormSchema,
  TeamFormValues,
} from "@/@types/team";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useGetTeamByIdQuery } from "@/redux/apis/TeamAPis";
import { useEffect } from "react";
import TeamForm from "./TeamForm";
import { Skeleton } from "../ui/skeleton";
interface TeamsFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  selectedId?: string | null;
}

const TeamsFormModal = ({
  open,
  onOpenChange,
  isEdit = false,
  selectedId = null,
}: TeamsFormModalProps) => {
  const { data: employeeData, isLoading: employeeDataLoading } =
    useGetTeamByIdQuery(selectedId as string, {
      skip: !open || (!isEdit && !selectedId),
    });
  const data = employeeData?.data as ExpandedSingleTeam;
  // Form State
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(TeamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      departmentId: "",
      teamLeaderId: "",
      teamMembers: [],
    },
  });

  useEffect(() => {
    if (data && isEdit) {
      reset({
        name: data.displayName,
        description: data.description || "",
        departmentId: data.departmentId,
        teamLeaderId: data.teamLeaderId || "?",
        teamMembers: data.teamMembers?.map((member) => member.id) || [],
      });
    } else {
      reset({
        name: "",
        description: "",
        departmentId: "",
        teamLeaderId: "",
        teamMembers: [],
      });
    }
  }, [data, isEdit, reset]);
  const onSubmit = (data: TeamFormValues) => {
    try {
      console.log(data);
      if (!isEdit) {
        console.log("Edit id :", selectedId);
        toast.success("Team created successfully!");
      } else {
        toast.success("Team updated successfully!");
      }
      reset();
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.message ??
          (isEdit ? "Failed to update Team" : "Failed to create Team"),
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
            <IoPeopleCircleOutline className="size-6 text-blue-500" />
            {isEdit ? "Update Team" : "New Team"}
          </SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
          <SheetBody className="grow p-0">
            <ScrollArea className="h-[calc(100vh-10.5rem)]">
              {employeeDataLoading ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <Skeleton className="h-12 w-32 rounded-md" />
                </div>
              ) : (
                <TeamForm
                  control={control}
                  errors={errors}
                  data={data}
                  isEdit={isEdit}
                />
              )}
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
                  "Update Team"
                ) : (
                  "Save Team"
                )}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TeamsFormModal;
