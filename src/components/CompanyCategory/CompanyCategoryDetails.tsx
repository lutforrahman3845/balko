"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TbCategory, TbInfoCircle, TbCalendarTime } from "react-icons/tb";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompanyCategoryByIdQuery } from "@/redux/apis/CompanyCategoryApis";

interface CompanyCategoryDetailsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId: string | null;
}

const CompanyCategoryDetails = ({
    open,
    onOpenChange,
    selectedId,
}: CompanyCategoryDetailsProps) => {
    const { data: category, isLoading } = useGetCompanyCategoryByIdQuery(selectedId as string, {
        skip: !selectedId,
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-150 inset-5 inset-s-auto h-auto rounded-lg p-0 sm:max-w-none ">
                <SheetHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-0">
                    <SheetTitle className="p-4 flex items-center gap-2.5 text-lg font-bold">
                        <TbCategory className="size-5 text-blue-500" />
                        Company Category Details
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">
                    <ScrollArea className="h-[calc(100vh-10rem)]">
                        <div className="p-6 space-y-8">
                            {isLoading ? (
                                <div className="space-y-6">
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-32 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ) : category ? (
                                <>
                                    {/* Basic Info */}
                                    <section className="space-y-4">
                                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                                            <TbInfoCircle className="size-4 text-blue-500" />
                                            General Information
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50/50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                            <div className="space-y-1">
                                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    Company Category Name
                                                </span>
                                                <p className="text-sm font-medium">
                                                    {category.name}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    ID
                                                </span>
                                                <p className="text-sm font-mono text-muted-foreground">
                                                    {category.id}
                                                </p>
                                            </div>
                                            <div className="sm:col-span-2 space-y-1 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    Description
                                                </span>
                                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    {category.description || "No description provided."}
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Metadata */}
                                    <section className="space-y-4">
                                        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                                            <TbCalendarTime className="size-4 text-emerald-500" />
                                            Timeline
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50/50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                            <div className="space-y-1">
                                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    Created At
                                                </span>
                                                <p className="text-sm font-medium">
                                                    {category.createdAt
                                                        ? format(new Date(category.createdAt), "PPP p")
                                                        : "-"}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
                                                    Last Updated
                                                </span>
                                                <p className="text-sm font-medium">
                                                    {category.updatedAt
                                                        ? format(new Date(category.updatedAt), "PPP p")
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                    <TbCategory className="size-12 mb-4 opacity-20" />
                                    <p>Company Category not found</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
};

export default CompanyCategoryDetails;
