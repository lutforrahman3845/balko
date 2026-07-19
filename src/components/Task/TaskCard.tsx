"use client";

import { ExpandedTask } from "@/@types/task";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Globe,
  LayoutDashboard,
  type LucideIcon,
  Monitor,
  Palette,
  Smartphone,
  Tag,
} from "lucide-react";

/* Stable hash so a given task/project always renders the same chip + counts. */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/* Category chip palette — the project drives which colour/icon a card gets. */
const CATEGORY_STYLES: { bg: string; text: string; icon: LucideIcon }[] = [
  { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-600 dark:text-zinc-300", icon: Monitor },
  { bg: "bg-orange-100 dark:bg-orange-500/15", text: "text-orange-600 dark:text-orange-300", icon: Smartphone },
  { bg: "bg-blue-100 dark:bg-blue-500/15", text: "text-blue-600 dark:text-blue-300", icon: LayoutDashboard },
  { bg: "bg-violet-100 dark:bg-violet-500/15", text: "text-violet-600 dark:text-violet-300", icon: Palette },
  { bg: "bg-teal-100 dark:bg-teal-500/15", text: "text-teal-600 dark:text-teal-300", icon: Globe },
];

const PRIORITY: Record<string, { dot: string; label: string }> = {
  high: { dot: "bg-rose-500", label: "High" },
  medium: { dot: "bg-amber-500", label: "Medium" },
  low: { dot: "bg-emerald-500", label: "Low" },
};

interface TaskCardProps {
  task: ExpandedTask;
  isDragging?: boolean;
  onClick?: () => void;
  /** Drag handle props from the dnd library, spread onto the card. */
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TaskCard = ({ task, isDragging, onClick, dragHandleProps }: TaskCardProps) => {
  const employees = task.assignedEmployees || [];
  const done = task.status === "completed";
  const priority = PRIORITY[task.priority ?? "medium"] ?? PRIORITY.medium;

  // Category chip from the project (falls back to a neutral "General" tag).
  const category = task.project
    ? {
        label: task.project.name,
        ...CATEGORY_STYLES[hash(task.project.id) % CATEGORY_STYLES.length],
      }
    : { label: "General", bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-500 dark:text-zinc-400", icon: Tag };
  const CategoryIcon = category.icon;



  return (
    <div
      onClick={onClick}
      {...dragHandleProps}
      className={cn(
        "group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 shadow-sm transition-all",
        "hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 cursor-grab active:cursor-grabbing",
        isDragging && "rotate-2 shadow-xl ring-2 ring-blue-500/40",
      )}
    >
      {/* Top row: category chip + priority */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium max-w-40",
            category.bg,
            category.text,
          )}
        >
          <CategoryIcon className="size-3 shrink-0" />
          <span className="truncate">{category.label}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground shrink-0">
          <span className={cn("size-2 rounded-full", priority.dot)} />
          {priority.label}
        </span>
      </div>

      {/* Title */}
      <h4
        className={cn(
          "text-[15px] font-semibold leading-snug line-clamp-2",
          done && "line-through text-muted-foreground",
        )}
      >
        {task.title}
      </h4>

      {/* Description */}
      {task.content && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
          {task.content}
        </p>
      )}

      {/* Footer: avatars + meta */}
      <div className="mt-4 flex items-center justify-between gap-2">
        {employees.length > 0 ? (
          <div className="flex -space-x-2">
            {employees.slice(0, 3).map((emp) => (
              <Tooltip key={emp.id}>
                <TooltipTrigger asChild>
                  <Avatar className="size-6 border-2 border-white dark:border-zinc-900 shadow-sm">
                    <AvatarImage src={emp?.avatar ?? undefined} alt={emp.name} />
                    <AvatarFallback className="text-[9px] font-bold bg-muted text-muted-foreground">
                      {emp.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{emp.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {employees.length > 3 && (
              <div className="flex items-center justify-center size-6 rounded-full bg-muted border-2 border-white dark:border-zinc-900 text-[9px] font-bold text-muted-foreground shadow-sm">
                +{employees.length - 3}
              </div>
            )}
          </div>
        ) : (
          <span className="text-[10px] italic text-muted-foreground">
            Unassigned
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
