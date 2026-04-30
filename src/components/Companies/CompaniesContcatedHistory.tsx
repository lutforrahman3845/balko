import { ContactHistoryResponse, ExpandedCompany } from "@/@types/company";
import { useGetCompanyContactHistoryQuery } from "@/redux/apis/CompaniesApis";
import { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
} from "@/components/ui/sheet";
import { BiMessageAltDots } from "react-icons/bi";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Globe, Mail, Phone } from "lucide-react";
import { ErrorState } from "../shared/ErrorState";
import { getStatusBadge } from "@/lib/ContactStatusBadge";
import { getConnectionStrengthBadge } from "@/lib/CompanyConnectionBadge";
import { LuBriefcase, LuMail, LuPhone } from "react-icons/lu";

interface CompaniesContcatedHistoryProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId?: string | null;
    data?: ExpandedCompany | null;
}

const CompaniesContcatedHistory = ({
    open,
    onOpenChange,
    selectedId,
    data = null }: CompaniesContcatedHistoryProps) => {
    const [limit, setLimit] = useState(20);
    const [historyData, setHistoryData] = useState<ContactHistoryResponse | null>(null)
    const { data: history, isLoading, error, isFetching } = useGetCompanyContactHistoryQuery({
        id: selectedId || "",
        pageIndex: 1,
        pageSize: limit,
    }, {
        skip: !selectedId,
    });
    const currentCount = historyData ? (historyData.companyConatact.length + historyData.conatactsHistory.length) : 0;
    const hasMore = history?.total ? currentCount < history.total : false;
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLimit(20);
    }, [selectedId]);

    useEffect(() => {
        if (history?.data) {
            setHistoryData(history?.data);
        }
    }, [history]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !isFetching && !isLoading) {
                    setLimit((prev) => prev + 20);
                }
            },
            { threshold: 0.1 },
        );

        const current = observerRef.current;
        if (current) {
            observer.observe(current);
        }
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [hasMore, isFetching, isLoading]);
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-125 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
                <SheetHeader className="border-b bg-muted/30 p-4">
                    <SheetTitle className="flex items-start gap-1 text-lg font-semibold">
                        <BiMessageAltDots className="size-5 text-blue-500 mt-1" />
                        <span> {data?.name} — Interaction History </span>
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">

                    {/* Company Preview */}
                    <div className="flex flex-col gap-4 relative overflow-hidden px-4 py-6">
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
                    <ScrollArea className="h-[calc(100vh-22rem)] border-t bg-muted/5">
                        <div className="px-4 py-6">
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
                            ) : error ? (
                                <ErrorState
                                    onRetry={() => { }}
                                    title="Failed to Load History"
                                    message="We couldn't load the contact history. Please check your connection and try again."
                                />
                            ) : historyData && (historyData.companyConatact.length > 0 || historyData.conatactsHistory.length > 0) ? (
                                <div className="flex flex-col gap-10">
                                    {/* Company Interactions Section */}
                                    {historyData.companyConatact.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-border/60" />
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded shadow-sm">
                                                    Company Interactions
                                                </span>
                                                <div className="h-px flex-1 bg-border/60" />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {historyData.companyConatact.map((item, index) => (
                                                    <div key={item.id} className="relative flex flex-col gap-3">
                                                        {/* Connector line for multiple interactions */}
                                                        {index < historyData.companyConatact.length - 1 && (
                                                            <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-border/40" />
                                                        )}

                                                        <div className="flex items-center justify-between relative">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-[24px] rounded-full bg-muted/30 border border-border/60 flex items-center justify-center z-10">
                                                                    <div className="size-1.5 rounded-full bg-primary/60" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[12px] font-bold text-foreground/80 tracking-tight leading-none">
                                                                        {new Date(item.lastInteractionAt).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            year: 'numeric'
                                                                        })}
                                                                    </span>
                                                                    <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest mt-1 opacity-60">
                                                                        {new Date(item.lastInteractionAt).toLocaleTimeString('en-US', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: true
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="scale-75 origin-right">
                                                                {getConnectionStrengthBadge(item.connectionStrength)}
                                                            </div>
                                                        </div>

                                                        <div className="text-[13px] text-muted-foreground leading-normal font-medium ml-9">
                                                            {item.note || "No notes available for this interaction."}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Interactions Section */}
                                    {historyData.conatactsHistory.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-border/60" />
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded shadow-sm">
                                                    Contact Interactions
                                                </span>
                                                <div className="h-px flex-1 bg-border/60" />
                                            </div>
                                            <div className="flex flex-col gap-6">
                                                {Object.values(
                                                    historyData.conatactsHistory.reduce((acc, item) => {
                                                        if (!acc[item.contactId]) acc[item.contactId] = { contact: item.contact, interactions: [] };
                                                        acc[item.contactId].interactions.push(item);
                                                        return acc;
                                                    }, {} as Record<string, { contact: any, interactions: any[] }>)
                                                ).map((group) => (
                                                    <div
                                                        key={group.contact?.id}
                                                        className="bg-background rounded-xl border border-border/40 p-4 transition-all duration-200"
                                                    >
                                                        {/* Contact Info Header */}
                                                        {group.contact && (
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 mb-4 border-b border-border/40">
                                                                <div className="flex items-start gap-4 min-w-0">
                                                                    <Avatar className="size-14 border-2 border-background shadow-md">
                                                                        <AvatarImage src={group.contact.avatar} alt={group.contact.name} />
                                                                        <AvatarFallback className="text-base bg-primary/5 text-primary font-bold">
                                                                            {group.contact.name.split(" ").map((n: string) => n[0]).join("")}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className="text-lg font-bold text-foreground truncate leading-tight">
                                                                            {group.contact.name}
                                                                        </span>
                                                                        <span className="text-sm  font-medium text-muted-foreground">
                                                                            {group.contact.position}
                                                                        </span>
                                                                        {group.contact.email && (
                                                                            <a
                                                                                href={`mailto:${group.contact.email}`}
                                                                            >
                                                                                <span className="text-sm text-muted-foreground font-medium ">{group.contact.email}</span>
                                                                            </a>
                                                                        )}
                                                                        {group.contact.phone && (
                                                                            <a
                                                                                href={`tel:${group.contact.phone}`}
                                                                            >
                                                                                <span className="text-sm text-muted-foreground font-medium ">{group.contact.phone}</span>
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )}

                                                        {/* List of Interactions for this contact */}
                                                        <div className="flex flex-col gap-6 pl-2">
                                                            {group.interactions.map((interaction, idx) => (
                                                                <div key={interaction.id} className="relative flex flex-col gap-3">
                                                                    {/* Connector line for multiple interactions */}
                                                                    {idx < group.interactions.length - 1 && (
                                                                        <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-border/40" />
                                                                    )}

                                                                    <div className="flex items-center justify-between relative">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="size-[24px] rounded-full bg-muted/30 border border-border/60 flex items-center justify-center z-10">
                                                                                <div className="size-1.5 rounded-full bg-primary/60" />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-[12px] font-bold text-foreground/80 tracking-tight leading-none">
                                                                                    {new Date(interaction.lastContacted).toLocaleDateString('en-US', {
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })}
                                                                                </span>
                                                                                <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest mt-1 opacity-60">
                                                                                    {new Date(interaction.lastContacted).toLocaleTimeString('en-US', {
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                        hour12: true
                                                                                    })}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="scale-75 origin-right">
                                                                            {getStatusBadge(interaction.status)}
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-[13px] text-muted-foreground leading-normal font-medium ml-9 ">
                                                                        {interaction.note || "No notes available for this interaction."}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div ref={observerRef} className="h-10 w-full flex items-center justify-center">
                                        {isFetching && (
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                                                <div className="size-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                Loading more...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
                                    <div className="size-14 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                                        <BiMessageAltDots className="size-7 text-muted-foreground/30" />
                                    </div>
                                    <p className="text-sm text-foreground font-medium">No History Found</p>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-50 text-center">There are no recorded interactions for this company yet.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </SheetBody>
            </SheetContent>
        </Sheet>
    );
};
export default CompaniesContcatedHistory;