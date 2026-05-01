import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import {
  Clock,
  User,
  Layout,
  Briefcase,
  Layers,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";

import { useGetDepartmentByIdQuery } from "@/redux/apis/DepartmentAPis";

interface DepartmentDeatilsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string | null;
}

const DepartmentDeatils = ({
  open,
  onOpenChange,
  selectedId,
}: DepartmentDeatilsProps) => {
  const {
    data: department,
    isLoading,
    error,
    refetch,
  } = useGetDepartmentByIdQuery(selectedId as string, {
    skip: !selectedId || !open,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 sm:w-125 inset-5 inset-s-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
        <SheetHeader className="border-b bg-muted/30 p-4">
          <SheetTitle className="flex items-start gap-1 text-lg font-semibold text-blue-600">
            <div className="size-5 rounded border border-blue-500/50 flex items-center justify-center bg-blue-500/10 mt-1">
              <Layers className="size-3.5 text-blue-500" />
            </div>
            <span>Department Details</span>
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
                  message="Failed to load department details. Please check your connection."
                />
              ) : department ? (
                <>
                  {/* Header Info */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                        {department.displayName}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2.5">

                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-transparent">
                        <Clock className="h-3.5 w-3.5" />
                        Created {format(new Date(department.createdAt), "MMM d, yyyy")}
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
                      {department.description || (
                        <span className="opacity-50">No description provided for this department.</span>
                      )}
                    </div>
                  </div>

                  {/* Department Head Section */}
                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                      <User className="size-4 text-emerald-500/70" />
                      Department Head :
                    </div>
                    {department.departmentHead ? (
                      <div className="flex items-center p-4 bg-emerald-50/30 dark:bg-emerald-500/5 rounded-xl border border-emerald-100/50 dark:border-emerald-500/10 group transition-all hover:shadow-md">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-2 ring-emerald-500/10 transition-transform group-hover:scale-105">
                          <AvatarImage src={department.departmentHead.avatar || ""} />
                          <AvatarFallback className="text-sm font-bold bg-muted text-muted-foreground">
                            {department.departmentHead.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex flex-col min-w-0 flex-1">
                          <p className="text-base font-bold text-foreground leading-none mb-1.5 group-hover:text-emerald-600 transition-colors">
                            {department.departmentHead.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                            <Briefcase className="size-3" />
                            {department.departmentHead.designation || "Executive"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center border border-dashed rounded-xl opacity-60">
                        <p className="text-sm text-muted-foreground">No head assigned yet.</p>
                      </div>
                    )}
                  </div>

                  {/* Parent Department Section */}
                  <div className="space-y-3 pt-6 border-t">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                      <Layers className="size-4 text-orange-500/70" />
                      Parent Department :
                    </div>
                    <div className="px-2">
                      {department.parentDepartment ? (
                        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg border border-orange-100 text-sm font-semibold">
                          {department.parentDepartment.displayName}
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground italic bg-muted px-3 py-1.5 rounded-lg border border-border/50">
                          Root Department (No Parent)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Extra Stats or Info could go here */}
                  <div className="pt-8 border-t flex justify-end">
                    <p className="text-[10px] text-muted-foreground font-mono">
                      DEPT_ID: {department.id} • LAST_UPDATED: {format(new Date(department.updatedAt), "MMM d, HH:mm")}
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

export default DepartmentDeatils;
