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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { ExpandFolder, FolderFormSchema, FolderFormValues, SingLeFolder } from "@/@types/folder";
import FolderForm from "./FolderForm";

interface FolderFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isEdit?: boolean;
    data?: ExpandFolder | SingLeFolder | null;
    selectedId?: string | null;
}

const FolderFormModal = ({
    open,
    onOpenChange,
    isEdit = false,
    data = null,
    selectedId = null,
}: FolderFormModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FolderFormValues>({
        resolver: zodResolver(FolderFormSchema),
        defaultValues: {
            name: "",
            parentFolderId: null,
            icon: "default",
        },
    });

    useEffect(() => {
        if (data && isEdit) {
            reset({
                name: data.name,
                parentFolderId: data.parentFolderId || null,
                icon: data.icon,
            });
        } else {
            reset({
                name: "",
                parentFolderId: null,
                icon: "default",
            });
        }
    }, [data, isEdit, reset]);

    const onSubmit = (data: FolderFormValues) => {
        try {
            console.log(data);
            if (!isEdit) {
                toast.success("Folder created successfully!");
            } else {
                console.log("Edit id :", selectedId);
                toast.success("Folder updated successfully!");
            }
            reset();
            onOpenChange(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(
                error?.message ??
                (isEdit ? "Failed to update folder" : "Failed to create folder"),
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
                        <HiOutlineFolderAdd className="size-5 text-blue-500" />
                        {isEdit ? "Update Folder" : "New Folder"}
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <FolderForm
                                control={control}
                                errors={errors}
                                isEdit={isEdit}
                                data={data}
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
                                    "Update Folder"
                                ) : (
                                    "Save Folder"
                                )}
                            </Button>
                        </div>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default FolderFormModal;

