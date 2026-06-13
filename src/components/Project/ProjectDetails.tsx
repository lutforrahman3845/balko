import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import {
  Calendar,
  Clock,
  Layout,
  Briefcase,
  Activity,
  CircleDollarSign,
  FileText,
  Building2,
  FolderOpen,
  ExternalLink,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { cn } from "@/lib/utils";
import { TbHomeFilled } from "react-icons/tb";
import { TiUser } from "react-icons/ti";
import { useGetProjectByIdQuery } from "@/redux/apis/ProjectApis";
import { getProjectStatusBadge } from "@/lib/projectStatusBadges";
import { RiTeamFill } from "react-icons/ri";
import { ExpandedSingleTeam } from "@/@types/team";
import { ExpandedProjectDocument } from "@/@types/project";

interface ProjectDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string | null;
}

const ProjectDetails = ({
  open,
  onOpenChange,
  selectedId,
}: ProjectDetailsProps) => {
  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useGetProjectByIdQuery(selectedId as string, {
    skip: !selectedId || !open,
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low Priority</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{priority}</Badge>;
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="gap-0 sm:w-225 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
          <SheetHeader className="border-b bg-muted/30 p-3 sm:px-5">
            <SheetTitle className="flex items-start gap-2 text-base font-semibold">
                <Briefcase className="size-5 text-blue-500" />
              <span>Project Details</span>
            </SheetTitle>
          </SheetHeader>

          <SheetBody className="p-0 bg-muted/5">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-4 sm:p-5">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-20 rounded-xl" />
                      <Skeleton className="h-20 rounded-xl" />
                    </div>
                  </div>
                ) : error ? (
                  <ErrorState
                    onRetry={() => refetch()}
                    message="Failed to load project details. Please check your connection."
                  />
                ) : project ? (
                  <div className="space-y-4">
                    {/* Header Area */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90">
                        {project.name}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2">
                        {getProjectStatusBadge(project.status || "planning")}
                        {getPriorityBadge(project.priority || "medium")}
                        <Badge variant="outline" className="capitalize flex items-center gap-1 border-muted-foreground/30 bg-background shadow-sm">
                          {project.type === "internal" ? (
                            <TbHomeFilled className="size-3 text-blue-500" />
                          ) : (
                            <TiUser className="size-3 text-emerald-500" />
                          )}
                          {project.type === "internal" ? "Internal" : "Client"}
                        </Badge>
                      </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      
                      {/* Left Column (Main Info) */}
                      <div className="lg:col-span-2 space-y-4">
                        
                        {/* Progress & Financials Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-4">
                            <Activity className="size-4 text-blue-500" /> 
                            Progress & Financials
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                            {/* Progress */}
                            <div className="flex flex-col gap-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Project Progress</span>
                                <span className={cn(
                                  "text-sm font-bold",
                                  project.progress === 100 ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"
                                )}>
                                  {project.progress}%
                                </span>
                              </div>
                              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden shadow-inner">
                                <div 
                                  className={cn(
                                    "h-full transition-all duration-500 ease-in-out",
                                    project.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                                  )} 
                                  style={{ width: `${project.progress}%` }} 
                                />
                              </div>
                            </div>

                            {/* Budget */}
                            <div className="flex items-center gap-3 sm:pl-5 sm:border-l border-dashed border-border/60">
                               <div className="p-2.5 bg-emerald-500/10 rounded-full shrink-0 border border-emerald-500/20">
                                 <CircleDollarSign className="size-5 text-emerald-600 dark:text-emerald-500" />
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Total Budget</span>
                                 <span className="font-bold text-lg leading-none tracking-tight">
                                   {project.budget ? `${project.budget.toLocaleString()} ${project.currency || 'USD'}` : "Not specified"}
                                 </span>
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* Description Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-3">
                            <Layout className="size-4 text-indigo-500" /> 
                            Description
                          </h3>
                          <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
                            {project.description || (
                              <span className="opacity-50 italic">No description provided for this project.</span>
                            )}
                          </div>
                        </div>

                        {/* Teams Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-sm flex items-center gap-1.5">
                              <RiTeamFill className="size-4 text-orange-500" /> 
                              Assigned Teams
                            </h3>
                            <Badge variant="secondary" className="font-bold text-[10px] h-5">{project.teams?.length || 0}</Badge>
                          </div>
                          
                          {project.teams && project.teams.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                              {project.teams.map((team: ExpandedSingleTeam
                              ) => (
                                <div key={team.id} className ="border-b-3 pb-3 last:border-b-0 last:pb-0 border-dashed">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex flex-col min-w-0">
                                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
                                          {team.department?.displayName || team.department?.name || "No Department"}
                                        </p>
                                      </div>
                                    </div>
                                    {team.teamLeader && (
                                      <div className="flex items-center gap-2.5 text-right shrink-0">
                                        <div className=" flex-col hidden sm:flex">
                                          <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Team Lead</span>
                                          <span className="text-xs font-semibold">{team.teamLeader.name}</span>
                                        </div>
                                        <Avatar className="size-7 border shadow-sm">
                                          <AvatarImage src={team.teamLeader.avatar || ""} />
                                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">{team.teamLeader.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {team.description && (
                                    <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/30">
                                      {team.description}
                                    </div>
                                  )}
                                  
                                  {team.teamMembers && team.teamMembers.length > 0 && (
                                    <div className="flex flex-col gap-3 pt-3 border-t border-dashed mt-1">
                                      <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider flex items-center justify-between">
                                        <span>Team Members</span>
                                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{team.teamMembers.length}</Badge>
                                      </span>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {team.teamMembers.map((member) => (
                                          <div key={member.id} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/40 transition-colors border border-transparent hover:border-border/50">
                                            <Avatar className="size-8 border shadow-sm">
                                              <AvatarImage src={member.avatar || ""} />
                                              <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0">
                                              <span className="text-xs font-bold truncate leading-tight">{member.name}</span>
                                              <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                                                {member.designation || member.role?.displayName || member.role?.name || "Member"}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center border border-dashed rounded-lg bg-muted/10">
                              <p className="text-xs text-muted-foreground">No teams assigned yet.</p>
                            </div>
                          )}
                        </div>

                        {/* Documents Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-sm flex items-center gap-1.5">
                              <FileText className="size-4 text-rose-500" /> 
                              Project Documents
                            </h3>
                            <Badge variant="secondary" className="font-bold text-[10px] h-5">{project.documents?.length || 0}</Badge>
                          </div>
                          
                          {project.documents && project.documents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {project.documents.map((doc: ExpandedProjectDocument
                              ) => (
                                <a 
                                  href={doc.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  key={doc.id} 
                                  className="p-3 border rounded-lg bg-background flex flex-col gap-2 hover:border-primary/50 transition-colors group relative"
                                >
                                   <div className="flex items-start justify-between gap-2">
                                     <div className="flex items-center gap-2 min-w-0">
                                       <div className="p-1.5 bg-rose-500/10 rounded-md group-hover:bg-rose-500/20 transition-colors">
                                         <FileText className="size-3.5 text-rose-600" />
                                       </div>
                                       <div className="flex flex-col min-w-0">
                                         <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors" title={doc.description || "Document"}>
                                           {doc.description || doc.documentType?.name || "Document"}
                                         </p>
                                         <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                                           {doc.documentType && <span>{doc.documentType.name}</span>}
                                           {doc.folder && (
                                             <span className="flex items-center gap-0.5">
                                               <FolderOpen className="size-2.5" />
                                               {doc.folder.name}
                                             </span>
                                           )}
                                         </div>
                                       </div>
                                     </div>
                                     <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                   </div>
                                   {doc.uploadedByEmployee && (
                                     <div className="flex items-center gap-1.5 pt-2 border-t border-dashed mt-auto">
                                       <Avatar className="size-4">
                                         <AvatarImage src={doc.uploadedByEmployee.avatar || ""} />
                                         <AvatarFallback className="text-[8px]">{doc.uploadedByEmployee.name.charAt(0)}</AvatarFallback>
                                       </Avatar>
                                       <span className="text-[10px] text-muted-foreground truncate">
                                         Added by {doc.uploadedByEmployee.name}
                                       </span>
                                       <span className="text-[10px] text-muted-foreground ml-auto">
                                         {format(new Date(doc.uploadedAt || new Date()), "MMM dd")}
                                       </span>
                                     </div>
                                   )}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center border border-dashed rounded-lg bg-muted/10">
                              <p className="text-xs text-muted-foreground italic">No documents attached.</p>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Right Column (Sidebar Info) */}
                      <div className="space-y-4">
                        
                        {/* Timeline Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <h3 className="font-semibold text-sm flex items-center gap-1.5 border-b pb-2 mb-3">
                            <Calendar className="size-4 text-violet-500" /> 
                            Timeline
                          </h3>
                          <div className="space-y-3">
                            <div className="flex flex-col gap-0.5">
                               <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Start Date</span>
                               <span className="text-sm font-semibold">{format(new Date(project.startDate), "MMMM dd, yyyy")}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                               <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">End Date</span>
                               <span className={cn(
                                 "text-sm font-semibold", 
                                 project.endDate && new Date(project.endDate) < new Date() && project.status !== "completed" 
                                  ? "text-destructive" 
                                  : ""
                               )}>
                                 {project.endDate ? format(new Date(project.endDate), "MMMM dd, yyyy") : "Not specified"}
                               </span>
                            </div>
                            <div className="flex flex-col gap-0.5 pt-2 border-t border-dashed">
                               <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1">
                                 <Clock className="size-3" />
                                 Created On
                               </span>
                               <span className="text-xs font-medium">{format(new Date(project.createdAt), "MMMM dd, yyyy")}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stakeholders Card */}
                        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                          <h3 className="font-semibold text-sm flex items-center gap-1.5 border-b pb-2 mb-3">
                            <Building2 className="size-4 text-amber-500" /> 
                            Stakeholders
                          </h3>
                          
                          <div className="space-y-4">
                            {/* Manager */}
                            <div>
                              <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-2">Project Manager</p>
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-transparent hover:border-border transition-colors">
                                <Avatar className="size-9 border shadow-sm">
                                  <AvatarImage src={project.manager?.avatar || ""} />
                                  <AvatarFallback className="font-bold bg-primary/10 text-primary">
                                    {project.manager?.name?.charAt(0) || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-sm font-bold truncate leading-tight">
                                    {project.manager?.name || "Unassigned"}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground truncate mt-0.5">
                                    {project.manager?.designation || project.manager?.email || "No email"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Department */}
                            {project.department && (
                              <div className="pt-2">
                                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Department</p>
                                <p className="text-sm font-semibold">{project.department.displayName || project.department.name}</p>
                              </div>
                            )}

                            {/* Company */}
                            {project.company && (
                              <div className="pt-2 border-t border-dashed">
                                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Client / Company</p>
                                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{project.company.name}</p>
                              </div>
                            )}

                            {/* Contact Person */}
                            {project.contactPerson && (
                              <div className="pt-2 border-t border-dashed">
                                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Contact Person</p>
                                <div className="bg-muted/10 p-2 rounded-lg border">
                                   <p className="text-sm font-semibold">{project.contactPerson.name}</p>
                                   {project.contactPerson.email && (
                                     <p className="text-[11px] text-muted-foreground mt-0.5">{project.contactPerson.email}</p>
                                   )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </ScrollArea>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProjectDetails;
