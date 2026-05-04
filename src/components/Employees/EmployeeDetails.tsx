import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetBody,
} from "@/components/ui/sheet";
import {
    Calendar,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Building2,
    ShieldCheck,
    Users2,
    Info,
    Clock,
} from "lucide-react";
import { BiUserPin } from "react-icons/bi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { cn } from "@/lib/utils";
import { useGetEmployeeByIdQuery } from "@/redux/apis/EmployeesApis";
import { ExpandedSingleEmployee } from "@/@types/employee";

interface EmployeeDetailsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId?: string | null;
}

const EmployeeDetails = ({
    open,
    onOpenChange,
    selectedId,
}: EmployeeDetailsProps) => {
    const { 
        data: employeeResponse, 
        isLoading: employeeDataLoading, 
        isError, 
        refetch 
    } = useGetEmployeeByIdQuery(selectedId as string, { skip: !open || !selectedId });

    const data = employeeResponse?.data as ExpandedSingleEmployee;

    const getStatusBadge = (type: string) => {
        const styles = {
            full_time: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
            part_time: "bg-amber-500/10 text-amber-600 border-amber-500/20",
            contractor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            intern: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        };
        const label = type.replace("_", " ").toUpperCase();
        return (
            <Badge variant="outline" className={cn("px-2 py-0.5 font-bold text-[10px]", styles[type as keyof typeof styles] || styles.full_time)}>
                {label}
            </Badge>
        );
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-140 inset-5 inset-s-auto h-auto rounded-2xl p-0 sm:max-w-none shadow-2xl border-l-0 overflow-hidden bg-background">
                <SheetHeader className="border-b bg-muted/20 p-5">
                    <SheetTitle className="flex items-center gap-2.5 text-lg font-bold">
                        <div className="size-8 rounded-lg border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
                            <BiUserPin className="size-5 text-blue-500" />
                        </div>
                        <span>Employee Profile</span>
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">
                    <ScrollArea className="h-[calc(100vh-10rem)]">
                        <div className="p-6 space-y-8">
                            {employeeDataLoading ? (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="size-20 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-6 w-1/3" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Skeleton className="h-24 rounded-xl" />
                                        <Skeleton className="h-24 rounded-xl" />
                                    </div>
                                    <Skeleton className="h-48 rounded-xl" />
                                </div>
                            ) : isError ? (
                                <ErrorState
                                    onRetry={() => refetch()}
                                    message="Failed to load employee details. Please try again."
                                />
                            ) : data ? (
                                <>
                                    {/* Profile Header */}
                                    <div className="relative group">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                            <Avatar className="size-24 border-4 border-background shadow-xl ring-1 ring-border">
                                                <AvatarImage src={data.avatar || ""} />
                                                <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
                                                    {data.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 text-center sm:text-left space-y-2">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-black tracking-tight text-foreground/90">
                                                        {data.name}
                                                    </h2>
                                                    <p className="text-sm font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                                                        <Briefcase className="size-3.5 text-blue-500" />
                                                        {data.designation}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                                                    {getStatusBadge(data.employeeType || "full_time")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Grid */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                <Building2 className="size-3 text-blue-500" />
                                                Department
                                            </div>
                                            <p className="text-sm font-bold text-foreground/80 leading-none">
                                                {data.department?.displayName || "N/A"}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                                                {data.department?.description}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                <ShieldCheck className="size-3 text-emerald-500" />
                                                Role
                                            </div>
                                            <p className="text-sm font-bold text-foreground/80 leading-none">
                                                {data.role?.displayName || "N/A"}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                                                {data.role?.description || "Access granted"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                                            <Info className="size-3.5 text-primary/70" />
                                            Contact Information
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                                                <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                                    <Mail className="size-4 text-blue-600" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Email Address</span>
                                                    <span className="text-sm font-medium truncate">{data.email || "No email provided"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                                                <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                    <Phone className="size-4 text-emerald-600" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Phone Number</span>
                                                    <span className="text-sm font-medium">{data.phone || "No phone provided"}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border">
                                                <div className="size-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                                                    <MapPin className="size-4 text-orange-600" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Office / Address</span>
                                                    <span className="text-sm font-medium leading-tight">{data.address || "No address on file"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Memberships */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                                                <Users2 className="size-3.5 text-orange-500/70" />
                                                Team Memberships
                                            </h3>
                                            <Badge variant="outline" className="text-[9px] font-black tracking-tighter bg-muted/30">
                                                {data.teams?.length || 0} TEAMS
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            {data.teams && data.teams.length > 0 ? (
                                                data.teams.map((team) => (
                                                    <div
                                                        key={team.id}
                                                        className="flex items-center gap-4 p-3 rounded-xl border border-border/50 bg-muted/5 hover:bg-muted/20 transition-all group"
                                                    >
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <p className="text-sm font-bold text-foreground/90 leading-tight mb-1">
                                                                {team.displayName}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                                <Clock className="size-3 text-muted-foreground/60" />
                                                                Joined {team.joinedAt ? format(new Date(team.joinedAt), "MMM yyyy") : "N/A"}
                                                            </div>
                                                        </div>
                                                        {team.roleInTeam && (
                                                            <Badge variant="secondary" className="text-[9px] font-bold py-0 h-5">
                                                                {team.roleInTeam.displayName}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl bg-muted/5">
                                                    <Users2 className="size-8 text-muted-foreground/20 mb-2" />
                                                    <p className="text-xs font-medium text-muted-foreground">Not assigned to any teams yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timeline/Meta */}
                                    <div className="pt-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/50 bg-muted/30 px-3 py-2 rounded-lg border border-dashed">
                                            <Calendar className="size-3" />
                                            Record created on {format(new Date(data.createdAt), "MMMM d, yyyy")}
                                        </div>
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

export default EmployeeDetails;

