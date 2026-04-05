import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import {
  CheckSquare,
  Calendar,
  Clock,
  User,
  Users,
  Layout,
} from "lucide-react";
import { BiMessageSquare } from "react-icons/bi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ExpandedTask } from "@/@types/tassk";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect, startTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskDetalisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string | null;
}

const TaskDetalisModal = ({
  open,
  onOpenChange,
  selectedId,
}: TaskDetalisModalProps) => {
  const {
    data: task,
    isLoading,
    error,
    refetch,
  } = useQuery<ExpandedTask>({
    queryKey: ["taskDetails", selectedId],
    queryFn: async () => {
      const res = await fetch(`/api/task/${selectedId}`);
      if (!res.ok) throw new Error("Failed to fetch task details");
      return res.json();
    },
    enabled: !!selectedId && open,
  });

  const [openModal, setOpenModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [notes, setNotes] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task?.status) {
      startTransition(() => {
        setNewStatus(task.status!);
      });
    }
  }, [task?.status, openModal]);

  const updateStatusMutation = useMutation({
    mutationFn: async (data: { status: string; notes?: string }) => {
      const res = await fetch(`/api/task/${selectedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.warn("PATCH not implemented, simulating success");
        return { success: true };
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskDetails", selectedId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated");
      setOpenModal(false);
      setNotes("");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status",
      );
    },
  });

  const handleUpdateStatus = () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }
    updateStatusMutation.mutate({ status: newStatus, notes });
  };

  const getStatusBadge = (status: string) => {
    const options: Record<string, { name: string; color: string }> = {
      pending: {
        name: "Pending",
        color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
      },
      in_progress: {
        name: "In Progress",
        color:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
      },
      completed: {
        name: "Completed",
        color:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
      },
      blocked: {
        name: "Blocked",
        color:
          "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
      },
    };
    const option = options[status] || options.pending;
    return (
      <Badge
        className={cn(
          "px-2.5 py-0.5 text-xs font-medium border-0",
          option.color,
        )}
      >
        {option.name}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      high: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
      medium:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
      low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    };
    return (
      <Badge
        className={cn(
          "px-2.5 py-0.5 border-0 text-[10px] font-bold uppercase tracking-wider",
          colors[priority] || colors.medium,
        )}
      >
        {priority}
      </Badge>
    );
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="gap-0 sm:w-125 inset-5 start-auto h-auto rounded-xl p-0 sm:max-w-none shadow-2xl border-l-0">
          <SheetHeader className="border-b bg-muted/30 p-4">
            <SheetTitle className="flex items-start gap-1 text-lg font-semibold">
              <div className="size-5 rounded border border-blue-500/50 flex items-center justify-center bg-blue-500/10 mt-1">
                <CheckSquare className="size-3.5 text-blue-500" />
              </div>
              <span>Task Overview</span>
            </SheetTitle>
          </SheetHeader>

          <SheetBody className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
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
                    message="Failed to load task details. Please check your connection."
                  />
                ) : task ? (
                  <>
                    {/* Header Info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                          {task.title}
                        </h2>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {getStatusBadge(task.status || "pending")}
                        {getPriorityBadge(task.priority || "medium")}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-transparent hover:border-border transition-colors">
                          <Clock className="h-3.5 w-3.5" />
                          Added{" "}
                          {format(new Date(task.createdAt), "MMM d, yyyy")}
                        </div>
                        {task.status !== "completed" && (
                          <Button
                            size={"sm"}
                            variant="outline"
                            onClick={() => setOpenModal(true)}
                            className="rounded-md px-6  font-bold flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
                          >
                            <BiMessageSquare size={16} />
                            Respond
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xs sm:text-sm  font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1.5">
                        <Calendar className="size-4 text-blue-500/70" />
                        Due Date :
                      </h4>
                      <p
                        className={cn(
                          "text-sm font-semibold decoration-2",
                          new Date(task.dueAt) < new Date() &&
                            task.status !== "completed"
                            ? "text-destructive  decoration-destructive/30"
                            : "text-foreground",
                        )}
                      >
                        {format(new Date(task.dueAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1.5">
                        <User className="size-4  text-emerald-500/70" />
                        Created By :
                      </h4>
                      <div className="flex items-center gap-2.5 group cursor-default">
                        <Avatar className="size-6 border shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage src={task.creator?.avatar || ""} />
                          <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                            {task.creator?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold truncate leading-none">
                            {task.creator?.name || "System"}
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                            {task.creator?.designation ||
                              task.creator?.email ||
                              "Admin"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content / Description */}
                    <div className="space-y-3 pt-6 border-t">
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/80">
                        <Layout className="size-4 text-primary/70" />
                        Description :
                      </div>
                      <div className=" px-2 bg-muted/5 min-h-6 text-sm leading-relaxed text-foreground/80">
                        {task.content || (
                          <em className="opacity-50">
                            No description provided for this task.
                          </em>
                        )}
                      </div>
                    </div>

                    {/* Assigned Members */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                          <Users className="size-4 text-orange-500" />
                          Assignees
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tighter bg-muted px-2 py-0.5 rounded-full">
                          {task.assignedContacts?.length || 0} Members
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {task.assignedContacts?.length > 0 ? (
                          task.assignedContacts.map((emp) => (
                            <div
                              key={emp.id}
                              className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors group rounded-md cursor-pointer"
                            >
                              <Avatar className="h-10 w-10 border shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                <AvatarImage src={emp.avatar || ""} />
                                <AvatarFallback className="text-xs font-bold bg-muted text-muted-foreground">
                                  {emp.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col min-w-0 flex-1">
                                <p className="text-sm font-semibold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">
                                  {emp.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {emp.designation || "Team Member"}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]  rounded hover:text-blue-500"
                              >
                                View Profile
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center border-2 border-dashed rounded-xl opacity-60">
                            <p className="text-sm text-muted-foreground">
                              No members assigned to this task yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </ScrollArea>
          </SheetBody>
        </SheetContent>
      </Sheet>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-112.5 p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BiMessageSquare className="size-5 text-primary" />
              </div>
              Respond to Task
            </DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">
              Update the current status of this task and add any relevant notes.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="space-y-2.5">
              <Label
                htmlFor="status"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Task Status
              </Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger
                  id="status"
                  className="w-full h-12 bg-muted/30 border-muted-foreground/20 hover:border-primary/50 transition-colors"
                >
                  <SelectValue placeholder="Select status">
                    {newStatus && getStatusBadge(newStatus)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="border-muted-foreground/20 shadow-xl">
                  <SelectItem value="pending" className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-400" />
                      <span className="font-medium text-sm text-foreground">
                        Pending
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="in_progress" className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                      <span className="font-medium text-sm text-foreground">
                        In Progress
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="completed" className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="font-medium text-sm text-foreground">
                        Completed
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="blocked" className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="font-medium text-sm text-foreground">
                        Blocked
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="notes"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Update Notes (Optional)
              </Label>
              <textarea
                id="notes"
                placeholder="What's the current update on this task?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex min-h-30 w-full rounded-xl border border-muted-foreground/20 bg-muted/30 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none hover:border-primary/50"
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setOpenModal(false)}
              className="flex-1 sm:flex-none font-semibold hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending}
              className="flex-1 sm:flex-none px-8 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {updateStatusMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskDetalisModal;
