"use client";
import { TaskHeader } from "@/components/Task/TaskHeader";
import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import FilterSearch from "@/components/shared/FilterSearch";
import FilterDropDown from "@/components/shared/FilterDropDown";
import { toast } from "sonner";
import { GetTask } from "@/@types/tassk";
import TaskTable from "@/components/Task/TaskTable";
const Page = () => {
  const [active, setActive] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<GetTask | null>(null);
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

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        active,
        searchQuery,
        statuses: selectedStatuses.join(","),
        priorities: selectedPriorities.join(","),
        pageIndex: pageIndex.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await fetch(`/api/task?${params.toString()}`);
      if (!response.ok) {
        toast.error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    active,
    searchQuery,
    selectedStatuses,
    selectedPriorities,
    pageIndex,
    pageSize,
  ]);

  return (
    <>
      <TaskHeader />
      <section>
        <div className="flex flex-wrap gap-4 pt-2 border-b px-6">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
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
        <div className="flex items-center  gap-4 p-4">
          <FilterSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
        data={tasks}
        loading={loading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default Page;
