/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useState } from "react";
import { TaskHeader } from "@/components/Task/TaskHeader";
import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Trash2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import FilterSearch from "@/components/shared/FilterSearch";
import FilterDropDown from "@/components/shared/FilterDropDown";
import TaskTable from "@/components/Task/TaskTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "sonner";
import { useGetTasksQuery } from "@/redux/apis/TasksApis";

const Page = () => {
  const [active, setActive] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowSelection, setRowSelection] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navItems = [
    { title: "All", icon: CalendarDays, id: "all" },
    { title: "Today", icon: CalendarCheck, id: "today" },
    { title: "Week", icon: CalendarRange, id: "week" },
  ];

  const statusOptions = [
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
      color:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    },
  ];

  const priorityOptions = [
    {
      id: "low",
      name: "Low",
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    },
    {
      id: "medium",
      name: "Medium",
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    },
    {
      id: "high",
      name: "High",
      color: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
    },
  ];

  const { data: tasks, isLoading: loading, isError, refetch } = useGetTasksQuery({
    pageIndex,
    pageSize,
    status: selectedStatuses.join(","),
    priority: selectedPriorities.join(","),
    timeFrame: active === "all" ? "" : active,
    searchQuery,
  });
  const selectedIds = useMemo(() => {
    const dataIds = new Set(tasks?.data.map((item: any) => String(item.id)));
    return Object.keys(rowSelection).filter(
      (id) => (rowSelection as any)[id] && dataIds.has(id)
    );
  }, [tasks, rowSelection]);
  return (
    <>
      <TaskHeader data={tasks?.data || []} />
      {isError ? (
        <>
          <div className="px-6 py-4">
            <ErrorState onRetry={() => refetch()} />
          </div>
        </>
      ) : (
        <>
          <section>
            <div className="flex flex-wrap gap-4 pt-2 border-b px-6">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setPageIndex(1);
                  }}
                  className={
                    cn(
                      "flex items-center gap-1.5 cursor-pointer pb-4 border-b-2 transition-all duration-200 -mb-px",
                      active === item.id
                        ? "border-blue-500 text-blue-500 font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground/80",
                    )}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center  gap-4 p-4">
              <FilterSearch
                searchQuery={searchQuery}
                setSearchQuery={(q) => { const val = q.trimStart().replace(/\s\s+/g, " "); setSearchQuery(val); if (val.trim() !== searchQuery.trim()) setPageIndex(1) }}


                placeholder="Search Tasks by Title, Content, or Assigned Employee Name"
              />
              <FilterDropDown
                label="Status"
                options={statusOptions}
                selectedValues={selectedStatuses}
                onSelectedValuesChange={setSelectedStatuses}
                setPageIndex={setPageIndex}
              />
              <FilterDropDown
                label="Priority"
                options={priorityOptions}
                selectedValues={selectedPriorities}
                onSelectedValuesChange={setSelectedPriorities}
                icon={AlertCircle}
                setPageIndex={setPageIndex}
              />
            </div>
          </section>
          <TaskTable
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
            data={tasks || null}
            loading={loading}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
          {selectedIds.length > 0 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300 w-[calc(100%-2rem)] sm:w-auto max-w-fit">
              <div className="flex items-center gap-3 sm:gap-6 px-3 py-2.5 sm:py-3 rounded-2xl bg-white/90 dark:bg-zinc-950/90 text-foreground shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
                <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-6 border-r border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-center size-8 sm:size-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                    <IoCheckmarkDoneOutline className="size-5 sm:size-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] sm:text-sm font-semibold whitespace-nowrap leading-none">
                      {selectedIds.length} {selectedIds.length === 1 ? "Task" : "Tasks"}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 uppercase tracking-wider font-bold hidden xs:inline-block">Selected</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 sm:h-9 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 gap-1.5 sm:gap-2 font-medium"
                    onClick={() => setRowSelection({})}
                  >
                    <X className="size-3.5 sm:size-4" />
                    <span className="hidden sm:inline">Clear</span>
                    <span className="sm:hidden text-xs">Clear</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 sm:h-9 px-3 sm:px-4 shadow-lg shadow-rose-500/10 dark:shadow-rose-500/20 gap-1.5 sm:gap-2 font-semibold"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Trash2 className="size-3.5 sm:size-4" />
                    <span className="hidden sm:inline">Delete Selected</span>
                    <span className="sm:hidden text-xs truncate max-w-20">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isDialogOpen && (
            <ConfirmDialog
              isOpen={isDialogOpen}
              type="danger"
              title="Delete Tasks"
              onClose={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
              confirmButtonType="destructive"
              onConfirm={() => {
                toast.success(`${selectedIds.length} tasks deleted successfully`);
                setRowSelection({});
                setIsDialogOpen(false);
              }}
            >
              <span>
                Are you sure you want to delete {selectedIds.length} selected {selectedIds.length === 1 ? "task" : "tasks"}? This action cannot be undone.
              </span>
            </ConfirmDialog>
          )}
        </>
      )
      }
    </>
  );
};

export default Page;
