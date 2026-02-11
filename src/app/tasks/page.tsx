"use client";
import { TaskHeader } from "@/components/Task/TaskHeader";
import { CalendarCheck, CalendarRange, ListChecks } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Page = () => {
  const [active, setActive] = useState<string>("today");

  const navItems = [
    { title: "Today", icon: CalendarCheck, id: "today" },
    { title: "Week", icon: CalendarRange, id: "week" },
    { title: "Completed", icon: ListChecks, id: "completed" },
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
                  : "border-transparent text-muted-foreground hover:text-foreground/80"
              )}
            >
              <item.icon className="size-5" />
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
