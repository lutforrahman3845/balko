"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
} from "@/components/ui/sheet";
import {
    Clock,
    Layout,
    Shield,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useGetRoleByIdQuery } from "@/redux/apis/RoleAPis";
import { Badge } from "../ui/badge";

interface RoleDeatilsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId?: string | null;
}

const RoleDeatils = ({
    open,
    onOpenChange,
    selectedId,
}: RoleDeatilsProps) => {
    const {
        data: role,
        isLoading,
        error,
        refetch,
    } = useGetRoleByIdQuery(selectedId as string, {
        skip: !selectedId || !open,
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-125 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
                <SheetHeader className="border-b bg-muted/30 p-4">
                    <SheetTitle className="flex items-start gap-1 text-lg font-semibold text-blue-600">
                        <div className="size-5 rounded border border-blue-500/50 flex items-center justify-center bg-blue-500/10 mt-1">
                            <Shield className="size-3.5 text-blue-500" />
                        </div>
                        <span>Role Details</span>
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">
                    <ScrollArea className="h-[calc(100vh-4rem)]">
                        <div className="p-6 space-y-8">
                            {isLoading ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                    </div>
                                    <Skeleton className="h-40 rounded-xl" />
                                </div>
                            ) : error ? (
                                <ErrorState
                                    onRetry={() => refetch()}
                                    message="Failed to load role details. Please check your connection."
                                />
                            ) : role ? (
                                <>
                                    {/* Header Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                                                {role.displayName}
                                            </h2>
                                        </div>

                                        <div className="flex flex-wrap gap-2.5">
                                            <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                                                {role.name}
                                            </Badge>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-transparent">
                                                <Clock className="h-3.5 w-3.5" />
                                                Created {format(new Date(role.createdAt), "MMM d, yyyy")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className="space-y-3 pt-6 border-t">
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                                            <Layout className="size-4 text-blue-500/70" />
                                            Description :
                                        </div>
                                        <div className="px-2 text-sm leading-relaxed text-foreground/80 italic">
                                            {role.description || (
                                                <span className="opacity-50">No description provided for this role.</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Extra Info */}
                                    <div className="pt-8 border-t flex justify-end">
                                        <p className="text-[10px] text-muted-foreground font-mono">
                                            ROLE_ID: {role.id} • LAST_UPDATED: {format(new Date(role.updatedAt), "MMM d, HH:mm")}
                                        </p>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </ScrollArea>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
};

export default RoleDeatils;
