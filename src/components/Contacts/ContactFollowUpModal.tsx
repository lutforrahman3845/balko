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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ContactsFollowUpFormSchema, ContactsFollowUpFormValues, ExpandedContact } from "@/@types/contact";
import SelectFormItem from "../shared/SelectFormItem";
import FormItem from "../shared/FormItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LuBuilding2, LuPhone, LuMail, LuBriefcase, LuTarget } from "react-icons/lu";
import { ContactStatusOptions } from "@/lib/ContactStatusBadge";
import { getErrorMessage } from "@/lib/errors";



interface ContactFollowUpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data?: ExpandedContact | null;
    selectedId?: string | null;
}

const ContactFollowUpModal = ({
    open,
    onOpenChange,
    data = null,
    selectedId = null,
}: ContactFollowUpModalProps) => {
    // Form State
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<ContactsFollowUpFormValues>({
        resolver: zodResolver(ContactsFollowUpFormSchema),
        defaultValues: {
            status: "",
            lastContacted: "",
            note: "",
        },
    });
    useEffect(() => {
        if (data) {
            reset({
                status: data.status,
                lastContacted: data.lastContacted || "",
                note: data.note || "",
            });
        } else {
            reset({
                status: "",
                lastContacted: "",
                note: "",
            });
        }
    }, [data, reset]);
    const onSubmit = (data: ContactsFollowUpFormValues) => {
        try {
            console.log(data);
            if (!data?.status || !data?.lastContacted || !data?.note) {
                console.log("Edit id :", selectedId);
                toast.success("Follow up created successfully!");
            } else {
                toast.success("Follow up updated successfully!");
            }
        } catch (error: unknown) {
            toast.error(
                getErrorMessage(
                    error,
                    (!data?.status || !data?.lastContacted || !data?.note) ? "Failed to update follow up" : "Failed to create follow up",
                ),
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
            <SheetContent className="gap-0 sm:w-150 inset-5 inset-s-auto h-auto rounded-lg p-0 sm:max-w-none ">
                <SheetHeader className="mb-0">
                    <SheetTitle className="p-3 flex items-center gap-2.5">
                        <LuTarget className="size-5 text-blue-500" />
                        Update Follow Up Information
                    </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
                    <SheetBody className="grow p-0">
                        <ScrollArea className="h-[calc(100vh-10.5rem)]">
                            <div className="flex flex-col px-6 py-3 space-y-6">
                                <div className="flex flex-col gap-4 relative overflow-hidden">
                                    <div className="flex items-start gap-4 sm:gap-5 relative z-10 w-full">
                                        <Avatar className="size-16 sm:size-20 border-[3px] border-background shadow-md">
                                            {data?.avatar ? (
                                                <AvatarImage className="object-cover" src={data.avatar} alt={data.name} />
                                            ) : (
                                                <AvatarFallback className="text-xl sm:text-2xl bg-primary/10 text-primary font-semibold">
                                                    {data?.name
                                                        ? data.name.split(" ").map((n) => n[0]).join("")
                                                        : "?"}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex flex-col flex-1 pt-0.5 min-w-0">
                                            <h3 className="text-lg sm:text-lg font-bold text-foreground tracking-tight mb-1 truncate pr-4">
                                                {data?.name || "Unknown Contact"}
                                            </h3>

                                            {data?.position && (
                                                <span className="text-sm font-medium text-primary flex items-center gap-1.5 mb-3 w-fit bg-primary/10 px-2 py-0.5 rounded-md">
                                                    <LuBriefcase className="size-3.5" />
                                                    <span className="truncate">{data.position}</span>
                                                </span>
                                            )}

                                            <div className="flex flex-col gap-3 mt-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6">
                                                    {data?.email && (
                                                        <a href={`mailto:${data.email}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2.5 transition-all group w-fit">
                                                            <div className="size-7 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                                                <LuMail className="size-3.5" />
                                                            </div>
                                                            <span className="truncate max-w-50">{data.email}</span>
                                                        </a>
                                                    )}
                                                    {data?.phone && (
                                                        <a href={`tel:${data.phone}`} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2.5 transition-all group w-fit">
                                                            <div className="size-7 rounded-md bg-background border border-border/60 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary shadow-sm transition-all duration-300">
                                                                <LuPhone className="size-3.5" />
                                                            </div>
                                                            <span className="truncate">{data.phone}</span>
                                                        </a>
                                                    )}
                                                </div>

                                                {data?.companyId && data?.company && (
                                                    <div className="pt-3 mt-2 border-t border-border/60">
                                                        <Link
                                                            href={data.company.website || "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 group w-fit"
                                                        >
                                                            <Avatar className="size-8 rounded-md border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                                                                <AvatarImage
                                                                    className="object-cover"
                                                                    src={data.company.logo ?? undefined}
                                                                    alt={data.company.name || "Company"}
                                                                />
                                                                <AvatarFallback className="rounded-md bg-muted text-muted-foreground">
                                                                    <LuBuilding2 className="size-4" />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Company</span>
                                                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-none">
                                                                    {data.company.name || "-"}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                            options={ContactStatusOptions}
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
                                    name="lastContacted"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem
                                            label={"Last Contacted"}
                                            inputType="datetime-local"
                                            placeholder={"Select last contacted date"}
                                            invalid={Boolean(errors.lastContacted)}
                                            errorMessage={errors.lastContacted?.message}
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
                                            label={"Note"}
                                            inputType="text"
                                            placeholder={"Type your last message or interaction note"}
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

export default ContactFollowUpModal