"use client";
import { TaskHeader } from "@/components/Task/TaskHeader";
import { AlertCircle, CalendarCheck, CalendarRange, ListChecks } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import FilterSearch from "@/components/shared/FilterSearch";
import FilterDropDown from "@/components/shared/FilterDropDown";
const Page = () => {
  const [active, setActive] = useState<string>("today");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const navItems = [
    { title: "Today", icon: CalendarCheck, id: "today" },
    { title: "Week", icon: CalendarRange, id: "week" },
    { title: "Completed", icon: ListChecks, id: "completed" },
  ];

  const statusOptions = [
    {
      id: "pending",
      name: "Pending",
      color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
    },
    {
      id: "in_progress",
      name: "In Progress",
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400"
    },
    {
      id: "completed",
      name: "Completed",
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
    },
  ];

  const priorityOptions = [
    {
      id: "low",
      name: "Low",
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
    },
    {
      id: "medium",
      name: "Medium",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
    },
    {
      id: "high",
      name: "High",
      color: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
    },
  ];

  return (
    <>
      <TaskHeader />
      <section>
        <div className="flex flex-wrap gap-4 pt-4 border-b px-6">
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
          />
          <FilterDropDown
            label="Priority"
            options={priorityOptions}
            selectedValues={selectedPriorities}
            onSelectedValuesChange={setSelectedPriorities}
            icon={AlertCircle}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
