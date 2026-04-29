"use client";

import { useEffect } from "react";
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
import { Loader2, Globe, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { CompaniesFollowUpFormSchema, CompaniesFollowUpFormValues, ExpandedCompany } from "@/@types/company";
import SelectFormItem from "../shared/SelectFormItem";
import FormItem from "../shared/FormItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuTarget } from "react-icons/lu";
import { ConnectionStrengthOptions } from "@/lib/CompanyConnectionBadge";

interface CompanyFollowUpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data?: ExpandedCompany | null;
    selectedId?: string | null;
}

const CompanyFollowUpModal = ({
    open,
    onOpenChange,
    data = null,
    selectedId = null,
}: CompanyFollowUpModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<CompaniesFollowUpFormValues>({
        resolver: zodResolver(CompaniesFollowUpFormSchema),
        defaultValues: {
            connectionStrength: "",
            lastInteractionAt: "",
            note: "",
        },
    });

    useEffect(() => {
        if (data) {
            reset({
                connectionStrength: (data.connectionStrength?.toLowerCase()
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .replace(/\s+/g, "_")  as any) || undefined,
                lastInteractionAt: data.lastInteractionAt || "",
                note: data.note || "",
            });
        } else {
            reset({
                connectionStrength: "",
                lastInteractionAt: "",
                note: "",
            });
        }
    }, [data, reset]);

    const onSubmit = (formData: CompaniesFollowUpFormValues) => {
        try {
            console.log(formData);
            if (selectedId) {
                console.log("Edit id :", selectedId);
                toast.success("Company follow up updated successfully!");
            } else {
                toast.success("Company follow up created successfully!");
            }
        } catch (error: any) {
            toast.error(
                error?.message ?? "Failed to save follow up information",
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
            <SheetContent className="gap-0 sm:w-150 inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none">
                <SheetHeader className="mb-0">
                    <SheetTitle className="p-3 flex items-center gap-2.5">
                        <LuTarget className="size-5 text-blue-500" />
                        Update Company Follow Up
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <div className="flex flex-col px-6 py-3 space-y-6">
                                {/* Company Preview */}
                                <div className="flex flex-col gap-4 relative overflow-hidden">
                                    <div className="flex items-start gap-4 sm:gap-5 relative z-10 w-full">
                                        <Avatar className="size-16 sm:size-20 border-[3px] border-background shadow-md rounded-xl">
                                            {data?.logo ? (
                                                <AvatarImage className="object-cover" src={data.logo} alt={data.name} />
                                            ) : (
                                                <AvatarFallback className="text-xl sm:text-2xl bg-primary/10 text-primary font-semibold rounded-xl">
                                                    {data?.name
                                                        ? data.name.split(" ").map((n) => n[0]).join("")
                                                        : "?"}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex flex-col flex-1 pt-0.5 min-w-0">
                                            <h3 className="text-lg sm:text-lg font-bold text-foreground tracking-tight mb-1 truncate pr-4">
                                                {data?.name || "Unknown Company"}
                                            </h3>

                                            <div className="flex flex-col gap-3 mt-1">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                    {data?.website && (
                                                        <div className="text-sm text-muted-foreground flex items-center gap-2.5 transition-all group w-fit">
                                                            <div className="size-7 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                                                <Globe className="size-3.5" />
                                                            </div>
                                                            <span className="truncate max-w-[150px]">{data.website.replace(/^https?:\/\//, '')}</span>
                                                        </div>
                                                    )}
                                                    {data?.email && (
                                                        <div className="text-sm text-muted-foreground flex items-center gap-2.5 transition-all group w-fit">
                                                            <div className="size-7 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                                                <Mail className="size-3.5" />
                                                            </div>
                                                            <span className="truncate max-w-[150px]">{data.email}</span>
                                                        </div>
                                                    )}
                                                    {data?.phone && (
                                                        <div className="text-sm text-muted-foreground flex items-center gap-2.5 transition-all group w-fit">
                                                            <div className="size-7 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                                                <Phone className="size-3.5" />
                                                            </div>
                                                            <span className="truncate">{data.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <Controller
                                    name="connectionStrength"
                                    control={control}
                                    render={({ field }) => (
                                        <SelectFormItem
                                            onChange={(value: string) => {
                                                field.onChange(value);
                                            }}
                                            label={"Connection Strength"}
                                            placeholder={"Select connection strength"}
                                            invalid={Boolean(errors.connectionStrength)}
                                            errorMessage={errors.connectionStrength?.message}
                                            options={ConnectionStrengthOptions}
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
                                    name="lastInteractionAt"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem
                                            label={"Last Interaction Date"}
                                            inputType="datetime-local"
                                            placeholder={"Select last interaction date"}
                                            invalid={Boolean(errors.lastInteractionAt)}
                                            errorMessage={errors.lastInteractionAt?.message}
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
                                <Controller
                                    name="note"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem
                                            label={"Interaction Note"}
                                            inputType="text"
                                            placeholder={"Describe the latest interaction or next steps"}
                                            invalid={Boolean(errors.note)}
                                            errorMessage={errors.note?.message}
                                            textarea={true}
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
                                ) : (
                                    "Save Follow Up"
                                )}
                            </Button>
                        </div>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default CompanyFollowUpModal;