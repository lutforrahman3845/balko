"use client";

import { useEffect } from "react";
import { Role, RoleFormSchema, RoleFormValues } from "@/@types/role";
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
import { TbUserSquareRounded } from "react-icons/tb";
import RoleForm from "./RoleForm";
import { getErrorMessage } from "@/lib/errors";

interface RoleFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isEdit?: boolean;
    data?: Role | null;
    selectedId?: string | null;
}

const RoleFormModal = ({
    open,
    onOpenChange,
    isEdit = false,
    data = null,
    selectedId = null,
}: RoleFormModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<RoleFormValues>({
        resolver: zodResolver(RoleFormSchema),
        defaultValues: {
            displayName: "",
            description: "",
        },
    });

    useEffect(() => {
        if (data && isEdit) {
            reset({
                displayName: data.displayName,
                description: data.description || "",
            });
        } else {
            reset({
                displayName: "",
                description: "",
            });
        }
    }, [data, isEdit, reset]);

    const onSubmit = (data: RoleFormValues) => {
        try {
            console.log(data);
            if (!isEdit) {
                toast.success("Role created successfully!");
            } else {
                console.log("Edit id :", selectedId);
                toast.success("Role updated successfully!");
            }
            reset();
            onOpenChange(false);
        } catch (error: unknown) {
            toast.error(
                getErrorMessage(error, isEdit ? "Failed to update role" : "Failed to create role"),
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
                        <TbUserSquareRounded className="size-5 text-blue-500" />
                        {isEdit ? "Update Role" : "New Role"}
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <RoleForm
                                control={control}
                                errors={errors}
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
                                    "Update Role"
                                ) : (
                                    "Save Role"
                                )}
                            </Button>
                        </div>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default RoleFormModal;
