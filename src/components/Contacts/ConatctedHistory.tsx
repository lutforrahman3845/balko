"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BiMessageAltDots } from "react-icons/bi";
import { ExpandedContact } from "@/@types/contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuBriefcase, LuBuilding2, LuMail, LuPhone } from "react-icons/lu";
import Link from "next/link";
import { ErrorState } from "../shared/ErrorState";
import { getStatusBadge } from "@/lib/ContactStatusBadge";
import { useGetContactHistoryQuery } from "@/redux/apis/ConatctAPis";
import { ContactHistory } from "@/@types/contactdHistory";

interface ConatctedHistoryProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId?: string | null;
    data?: ExpandedContact | null;
}

const ConatctedHistory = ({
    open,
    onOpenChange,
    selectedId,
    data = null,
}: ConatctedHistoryProps) => {
    const { data: history, isLoading, isError, refetch } = useGetContactHistoryQuery({ id: selectedId || "", pageIndex: 1, pageSize: 10 }, {
        skip: !selectedId
    });
    const historyData = history?.data as ContactHistory[]

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-125 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
                <SheetHeader className="border-b bg-muted/30 p-4">
                    <SheetTitle className="flex items-start gap-1 text-lg font-semibold">
                        <BiMessageAltDots className="size-5 text-blue-500 mt-1" />
                        <span>Contacted History </span>
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">
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
                    </div>
                    <ScrollArea className="h-[calc(100vh-22rem)] border-t bg-muted/5">
                        <div className="p-6">
                            <h4 className="text-sm font-semibold text-foreground mb-8 flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-primary" />
                                Activity Timeline
                            </h4>

                            {isLoading ? (
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4 animate-pulse">
                                            <div className="size-10 rounded-full bg-muted" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-32 bg-muted rounded" />
                                                <div className="h-16 w-full bg-muted rounded-xl" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : isError ? (
                                <ErrorState
                                    onRetry={() => refetch()}
                                    title="Failed to Load History"
                                    message="We couldn't load the contact history. Please check your connection and try again."
                                />
                            ) : historyData && historyData.length > 0 ? (
                                <div className="flex flex-col gap-2.5">
                                    {historyData.map((history) => (
                                        <div
                                            key={history.id}
                                            className="group bg-background rounded-lg border border-border/40 p-3 transition-all duration-200 hover:bg-muted/30 hover:border-primary/20 cursor-default"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-[13px] font-bold text-foreground/90 tracking-tight leading-none">
                                                            {new Date(history.lastContacted).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest mt-1 opacity-70">
                                                            {new Date(history.lastContacted).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="scale-90 origin-right">
                                                        {getStatusBadge(history.status)}
                                                    </div>
                                                </div>

                                                <div className="text-[13px] text-muted-foreground/80 leading-normal font-medium border-l border-primary/20 pl-3 py-0.5 mt-0.5">
                                                    {history.note || "No notes available for this interaction."}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                                    <div className="size-14 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                                        <BiMessageAltDots className="size-7 text-muted-foreground/30" />
                                    </div>
                                    <p className="text-sm text-foreground font-medium">No History Found</p>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-50 text-center">There are no recorded interactions for this contact yet.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
};

export default ConatctedHistory;
