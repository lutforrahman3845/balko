import { ExpandedTask, GetTask } from "@/@types/task";
import { useMemo, useState } from "react";
import { Briefcase } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import DataTable from "../shared/DataTable";
import TablePagination from "../shared/TablePagination";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import ConfirmDialog from "../shared/ConfirmDialog";
import { toast } from "sonner";
import TaskFormModal from "./TaskFormModal";
import TaskDetalisModal from "./TaskDetalisModal";

interface TaskTableProps {
  data: GetTask | null;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  loading: boolean;
  rowSelection: { [key: string]: boolean };
  setRowSelection: (
    value:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
}

const getStatusBadge = (status: string) => {
  const options = [
    {
      id: "pending",
      name: "Pending",
      color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    },
    {
      id: "in_progress",
      name: "In Progress",
      color:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
    },
    {
      id: "completed",
      name: "Completed",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    },
    {
      id: "blocked",
      name: "Blocked",
      color: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    },
  ];
  const option = options.find((opt) => opt.id === status) || options[0];
  return (
    <Badge
      className={cn(
        "px-2 py-0.5 text-[11px] font-medium border-0",
        option.color,
      )}
    >
      {option.name}
    </Badge>
  );
};

const TaskTable = ({
  data,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  loading,
  rowSelection,
  setRowSelection,
}: TaskTableProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [taskDetalisOpen, setTaskDetalisOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ExpandedTask | null>(null);
  const handleDialogOpen = (id: string) => {
    setDialogOpen(true);
    setSelectedId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };
  const columns = useMemo<ColumnDef<ExpandedTask>[]>(
    () => [
      {
        accessorKey: "status",
        id: "status-toggle",
        header: "",
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div className="flex items-center justify-center ps-2.5">
              <Checkbox id={task.id}
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={"selectRow"} />
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      {
        accessorKey: "title",
        id: "title",
        header: "Task",
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div className="flex flex-col min-w-0 py-1">
              <div
                className={cn(
                  "font-medium truncate text-sm leading-tight max-w-60",
                  task.status === "completed" &&
                  "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </div>
              {task.content && (
                <div className="text-[11px] text-muted-foreground truncate opacity-70 leading-normal max-w-60">
                  {task.content}
                </div>
              )}
            </div>
          );
        },
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: "project",
        id: "project",
        header: "Project",
        cell: ({ row }) => {
          const project = row.original.project;
          if (!project) return <span className="text-muted-foreground text-[11px] italic">No Project</span>;
          
          return (
            <div className="flex items-center gap-2 max-w-40">
              <div className="flex items-center justify-center size-6 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <Briefcase className="size-3.5" />
              </div>
              <span className="text-xs font-medium truncate" title={project.name}>
                {project.name}
              </span>
            </div>
          );
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "assignedEmployees",
        id: "assigned",
        header: "Assigned",
        cell: ({ row }) => {
          const employee = row.original.assignedEmployees || [];

          if (employee.length === 0) {
            return (
              <span className="text-xs text-muted-foreground italic">
                Unassigned
              </span>
            );
          }

          return (
            <div className="flex items-center gap-2 group">
              <div className="flex -space-x-1 transition-all">
                {employee.slice(0, 3).map((emp) => (
                  <Tooltip key={emp.id}>
                    <TooltipTrigger>
                      <Avatar className="size-8 border-2 shadow-sm shrink-0">
                        <AvatarImage
                          src={emp?.avatar ?? undefined}
                          alt={emp.name}
                        />
                        <AvatarFallback className="text-[10px] font-bold bg-muted text-muted-foreground">
                          {emp.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{emp.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {emp?.designation ?? ""}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                ))}
                {employee.length > 3 && (
                  <div className="size-6 rounded-full bg-muted border-2 border-background ring-1 ring-border flex items-center justify-center text-[10px] font-bold text-muted-foreground z-10 shadow-sm shrink-0">
                    +{employee.length - 3}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium truncate group-hover:text-primary transition-colors">
                  {employee[0].name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {employee[0]?.designation ?? ""}
                </span>
                {employee.length > 1 && (
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    +{employee.length - 1} others
                  </span>
                )}
              </div>
            </div>
          );
        },
        enableSorting: false,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "priority",
        id: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const priority = row.original.priority;
          if (!priority)
            return <span className="text-muted-foreground text-xs">None</span>;

          const priorityColors: Record<string, string> = {
            high: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
            medium:
              "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
            low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
          };

          return (
            <Badge
              className={cn(
                "px-1.5 py-0 border-0 text-[10px] font-semibold uppercase",
                priorityColors[priority],
              )}
            >
              {priority}
            </Badge>
          );
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "dueAt",
        id: "dueAt",
        header: "Due Date",
        cell: ({ row }) => {
          const task = row.original;
          const isOverdue =
            new Date(task.dueAt) < new Date() && task.status !== "completed";

          return (
            <span
              className={cn(
                "text-xs font-medium",
                isOverdue && "text-destructive",
              )}
            >
              {format(new Date(task.dueAt), "MMM dd, yyyy")}
            </span>
          );
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        cell: ({ row }) => getStatusBadge(row.original.status || "pending"),
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "createdAt",
        id: "created",
        header: "Added",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
          </span>
        ),
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-start text-muted-foreground">
            <div className="flex items-center gap-3">
              {row.original.status !== "completed" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="text-xl cursor-pointer"
                      role="button"
                      onClick={() => {
                        const id = row?.original?.id;
                        if (id) setSelectedId(id);
                        const task = row?.original;
                        setSelectedTask(task);
                        setTaskFormOpen(true);
                      }}
                    >
                      <TbEdit />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Task</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      const id = row?.original?.id;
                      if (id) setSelectedId(id);
                      setTaskDetalisOpen(true);
                    }}
                  >
                    <TbEye />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Task Details</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="text-xl cursor-pointer"
                    role="button"
                    onClick={() => {
                      const id = row?.original?.id;
                      if (id) handleDialogOpen(id);
                    }}
                  >
                    <TbTrash className="hover:text-red-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Task</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ),
        enableSorting: false,
        enableHiding: true,
        enableResizing: true,
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<ExpandedTask>({
    data: data?.data || [],
    columns,
    state: {
      rowSelection,
    },
    getRowId: (row) => String(row.id),
    onRowSelectionChange: (updater) => {
      const newRowSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <DataTable table={table} loading={loading} />
        {data && data?.data?.length > 0 && (
          <TablePagination
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={loading}
            pageCount={data?.meta?.totalPages || 0}
            recordCount={data?.meta?.total || 0}
          />
        )}
      </div>
      {dialogOpen && (
        <ConfirmDialog
          isOpen={dialogOpen}
          type="danger"
          title={"Delete Task"}
          onClose={handleDialogClose}
          onCancel={handleDialogClose}
          confirmButtonType={"destructive"}
          onConfirm={() => {
            toast.success("Task deleted successfully");
            handleDialogClose();
          }}
        >
          <span>
            Are you sure you want to delete this task? You can not undo this
            action.
          </span>
        </ConfirmDialog>
      )}
      <TaskFormModal
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        isEdit={true}
        data={selectedTask || null}
        selectedId={selectedId}
      />
      <TaskDetalisModal
        open={taskDetalisOpen}
        onOpenChange={setTaskDetalisOpen}
        selectedId={selectedId}
      />
    </>
  );
};

export default TaskTable;
