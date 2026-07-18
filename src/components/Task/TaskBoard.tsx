"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { ExpandedTask, GetTask } from "@/@types/task";
import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/redux/apis/TasksApis";
import TaskCard from "./TaskCard";
import TaskDetalisModal from "./TaskDetalisModal";
import TaskFormModal from "./TaskFormModal";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Circle, Plus } from "lucide-react";

// The board's 4 columns map onto the existing task statuses. The image's
// "In Review" column is backed by the `blocked` status, so no data migration
// is needed and drag-and-drop still persists a real value.
type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";

const COLUMNS: {
  id: TaskStatus;
  title: string;
  icon: string;
  accent: string;
}[] = [
  { id: "pending", title: "To-do", icon: "text-zinc-400", accent: "bg-zinc-100/70 dark:bg-zinc-800/40" },
  { id: "in_progress", title: "On Progress", icon: "text-blue-500", accent: "bg-blue-50/70 dark:bg-blue-500/5" },
  { id: "blocked", title: "Blocked/In Review", icon: "text-amber-500", accent: "bg-amber-50/70 dark:bg-amber-500/5" },
  { id: "completed", title: "Completed", icon: "text-emerald-500", accent: "bg-emerald-50/70 dark:bg-emerald-500/5" },
];

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: "To-do",
  in_progress: "On Progress",
  completed: "Completed",
  blocked: "Blocked",
};

type Board = Record<TaskStatus, ExpandedTask[]>;

const emptyBoard = (): Board => ({
  pending: [],
  in_progress: [],
  completed: [],
  blocked: [],
});

function groupTasks(tasks: ExpandedTask[]): Board {
  const grouped = emptyBoard();
  tasks.forEach((task) => {
    const status = (task.status ?? "pending") as TaskStatus;
    (grouped[status] ?? grouped.pending).push(task);
  });
  return grouped;
}

interface TaskBoardProps {
  searchQuery?: string;
  priority?: string;
  timeFrame?: string;
}

const TaskBoard = ({ searchQuery, priority, timeFrame }: TaskBoardProps) => {
  // Board needs every status, so we fetch a large page and skip the status filter.
  const { data, isLoading, isError, refetch } = useGetTasksQuery({
    pageIndex: 1,
    pageSize: 1000,
    searchQuery,
    priority,
    timeFrame,
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  // Ordered per-column lists — the source of truth the DnD library reorders.
  const [board, setBoard] = useState<Board>(emptyBoard);
  // Re-seed from the query result whenever a fresh one arrives (render-phase
  // sync, so the board tracks the server without an effect / cascading render).
  const [seededFrom, setSeededFrom] = useState<GetTask | undefined>(undefined);
  if (data !== seededFrom) {
    setSeededFrom(data);
    setBoard(groupTasks(data?.data ?? []));
  }

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId as TaskStatus;
    const to = destination.droppableId as TaskStatus;

    // Dropped back in the exact same spot — nothing to do.
    if (from === to && source.index === destination.index) return;

    const previous = board; // snapshot for rollback

    setBoard((prev) => {
      const next: Board = {
        pending: [...prev.pending],
        in_progress: [...prev.in_progress],
        completed: [...prev.completed],
        blocked: [...prev.blocked],
      };
      const [moved] = next[from].splice(source.index, 1);
      if (!moved) return prev;
      const updated = from === to ? moved : { ...moved, status: to };
      next[to].splice(destination.index, 0, updated);
      return next;
    });

    // Persist only when the column (status) actually changed.
    if (from !== to) {
      updateTaskStatus({ id: draggableId, status: to })
        .unwrap()
        .then(() => toast.success(`Task moved to ${STATUS_LABEL[to]}`))
        .catch(() => {
          toast.error("Failed to move task");
          setBoard(previous); // rollback
        });
    }
  };

  if (isError) {
    return (
      <div className="px-6 py-4">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 min-w-max pb-2">
            {COLUMNS.map((col) => (
              <div key={col.id} className="flex w-72 shrink-0 flex-col">
                {/* Column header */}
                <div className="flex items-center justify-between gap-2 mb-3  p-2 bg-muted/80 dark:bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    <Circle className={cn("size-4", col.icon)} strokeWidth={2.5} />
                    <span className="text-sm font-semibold">{col.title}</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {board[col.id].length}
                    </span>
                  </div>
                  <button
                    onClick={() => setFormOpen(true)}
                    title="Add task"
                    aria-label="Add task"
                    className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground transition-colors"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                {/* Droppable body */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "flex-1 min-h-30 space-y-3 rounded-xl border  p-1 transition-colors border-dashed border-zinc-300 dark:border-zinc-700",
                        snapshot.isDraggingOver &&
                          cn(col.accent, "border-dashed border-zinc-300 dark:border-zinc-700"),
                      )}
                    >
                      {isLoading ? (
                        <div className="space-y-3">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-xl" />
                          ))}
                        </div>
                      ) : board[col.id].length === 0 && !snapshot.isDraggingOver ? (
                        <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-xs text-muted-foreground">
                          Drop tasks here
                        </div>
                      ) : null}

                      {board[col.id].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                isDragging={dragSnapshot.isDragging}
                                onClick={() => {
                                  setSelectedId(String(task.id));
                                  setDetailsOpen(true);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <TaskDetalisModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        selectedId={selectedId}
      />
      <TaskFormModal open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
};

export default TaskBoard;
