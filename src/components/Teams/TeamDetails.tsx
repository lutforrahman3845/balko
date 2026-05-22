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
    Briefcase,
    Building2,
    ShieldCheck,
    Users2,
    User,
    Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { useGetTeamByIdQuery } from "@/redux/apis/TeamAPis";
import { ExpandedSingleTeam } from "@/@types/team";
import { IoPeopleCircle } from "react-icons/io5";

interface TeamDetailsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedId?: string | null;
}

const TeamDetails = ({
    open,
    onOpenChange,
    selectedId,
}: TeamDetailsProps) => {
    const { data: teamData, isLoading: teamDataLoading, isError, refetch } = useGetTeamByIdQuery(selectedId as string, { skip: !open || !selectedId })
    const data = teamData?.data as ExpandedSingleTeam;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="gap-0 sm:w-140 inset-5 inset-s-auto h-auto rounded-lg p-0 sm:max-w-none shadow-2xl border-l-0 overflow-hidden bg-background">
                <SheetHeader className="bg-muted/20 p-5">
                    <SheetTitle className="flex items-center gap-2.5 text-lg font-bold">
                        <IoPeopleCircle className="size-5 text-blue-500" />
                        <span>Team Profile</span>
                    </SheetTitle>
                </SheetHeader>

                <SheetBody className="p-0">
                    <ScrollArea className="h-[calc(100vh-10rem)]">
                        <div className="px-6 space-y-8">
                            {teamDataLoading ? (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="size-20 rounded-xl" />
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
                                    message="Failed to load team details. Please try again."
                                />
                            ) : data ? (
                                <>
                                    {/* Team Header */}
                                    <div className="relative group">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                            <div className="flex-1 text-center sm:text-left space-y-2">
                                                <div className="space-y-1">
                                                    <h2 className="text-2xl font-black tracking-tight text-foreground/90">
                                                        {data.displayName}
                                                    </h2>
                                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                                        <Badge variant="outline" className="bg-blue-500/5 text-blue-600 border-blue-500/20 font-bold text-[10px]">
                                                            {data.name}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                                    {data.description || "No description provided for this team."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                <Building2 className="size-3 text-blue-500" />
                                                Department
                                            </div>
                                            <p className="text-sm font-bold text-foreground/80 leading-none">
                                                {data.department?.displayName || "N/A"}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                                                {data.department?.description || "No department description"}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                <Users className="size-3 text-emerald-500" />
                                                Team Size
                                            </div>
                                            <p className="text-sm font-bold text-foreground/80 leading-none">
                                                {data.teamMembers?.length || 0} Members
                                            </p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                                                Including the team leader
                                            </p>
                                        </div>
                                    </div>

                                    {/* Team Leader */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                                            <ShieldCheck className="size-3.5 text-primary/70" />
                                            Team Leader
                                        </h3>
                                        {data.teamLeader ? (
                                            <div className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 shadow-sm">
                                                <Avatar className="size-14 border-2 border-background shadow-md ring-1 ring-primary/20">
                                                    <AvatarImage src={data.teamLeader.avatar || ""} />
                                                    <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                                                        {data.teamLeader.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-bold text-foreground truncate">
                                                        {data.teamLeader.name}
                                                    </h4>
                                                    <div className="flex flex-col gap-1 mt-1">
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Briefcase className="size-3 text-blue-500" />
                                                            {data.teamLeader.designation}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Mail className="size-3 text-emerald-500" />
                                                            {data.teamLeader.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4 rounded-xl border border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/5">
                                                <p className="text-xs font-medium text-muted-foreground">No leader assigned to this team.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Team Members */}
                                    <div className="space-y-4 pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                                                <Users2 className="size-3.5 text-orange-500/70" />
                                                Team Members
                                            </h3>
                                            <Badge variant="outline" className="text-[9px] font-black tracking-tighter bg-muted/30">
                                                {data.teamMembers?.length || 0} TOTAL
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            {data.teamMembers && data.teamMembers.length > 0 ? (
                                                data.teamMembers.map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-muted/5 hover:bg-muted/20 transition-all group"
                                                    >
                                                        <Avatar className="size-10 border border-border shadow-sm group-hover:scale-105 transition-transform">
                                                            <AvatarImage src={member.avatar || ""} />
                                                            <AvatarFallback className="text-xs font-bold bg-muted text-muted-foreground">
                                                                {member.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <p className="text-sm font-bold text-foreground/90 leading-tight">
                                                                {member.name}
                                                            </p>
                                                            <p className="text-[11px] text-muted-foreground truncate">
                                                                {member.designation}
                                                            </p>
                                                            <p className="text-[11px] text-muted-foreground truncate">
                                                                • {member.email}
                                                            </p>
                                                        </div>
                                                        <div className="size-6 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <User className="size-3 text-muted-foreground" />
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl bg-muted/5">
                                                    <Users2 className="size-8 text-muted-foreground/20 mb-2" />
                                                    <p className="text-xs font-medium text-muted-foreground">No members assigned yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timeline/Meta */}
                                    <div className="pt-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/50 bg-muted/30 px-3 py-2 rounded-lg border border-dashed">
                                            <Calendar className="size-3" />
                                            Team established on {format(new Date(data.createdAt), "MMMM d, yyyy")}
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

export default TeamDetails;

