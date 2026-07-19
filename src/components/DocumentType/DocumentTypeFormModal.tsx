"use client";

import { useEffect } from "react";
import { DocumentType, DocumentTypeFormSchema, DocumentTypeFormValues } from "@/@types/documents";
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
import { TbFileText } from "react-icons/tb";
import DocumentTypeForm from "./DocumentTypeForm";
import { getErrorMessage } from "@/lib/errors";

interface DocumentTypeFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isEdit?: boolean;
    data?: DocumentType | null;
    selectedId?: string | null;
}

const DocumentTypeFormModal = ({
    open,
    onOpenChange,
    isEdit = false,
    data = null,
    selectedId = null,
}: DocumentTypeFormModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<DocumentTypeFormValues>({
        resolver: zodResolver(DocumentTypeFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (data && isEdit) {
            reset({
                name: data.name,
                description: data.description || "",
            });
        } else {
            reset({
                name: "",
                description: "",
            });
        }
    }, [data, isEdit, reset]);

    const onSubmit = (formData: DocumentTypeFormValues) => {
        try {
            console.log(formData);
            if (!isEdit) {
                toast.success("Document type created successfully!");
            } else {
                console.log("Edit id :", selectedId);
                toast.success("Document type updated successfully!");
            }
            reset();
            onOpenChange(false);
        } catch (error: unknown) {
            toast.error(
                getErrorMessage(error, isEdit ? "Failed to update document type" : "Failed to create document type"),
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
                        <TbFileText className="size-5 text-blue-500" />
                        {isEdit ? "Update Document Type" : "New Document Type"}
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <DocumentTypeForm
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
                                    "Update Document Type"
                                ) : (
                                    "Save Document Type"
                                )}
                            </Button>
                        </div>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default DocumentTypeFormModal;
