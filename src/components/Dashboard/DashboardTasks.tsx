"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Circle, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const initialTasks = [
  {
    id: 1,
    title: "Review Acme Corp Proposal",
    due: "Today, 5:00 PM",
    priority: "High",
    avatar: "/avatars/avatar-11.jpg",
    completed: false,
  },
  {
    id: 2,
    title: "Follow up with Pied Piper",
    due: "Tomorrow",
    priority: "Medium",
    avatar: "/avatars/avatar-12.jpg",
    completed: false,
  },
  {
    id: 3,
    title: "Prepare Q3 Strategy Deck",
    due: "In 2 days",
    priority: "Low",
    avatar: "/avatars/avatar-13.jpg",
    completed: true,
  },
  {
    id: 4,
    title: "Sync with marketing team",
    due: "In 3 days",
    priority: "Medium",
    avatar: "/avatars/avatar-14.jpg",
    completed: false,
  },
];

const priorityDot = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

const DashboardTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-semibold">Active Tasks</span>
          <p className="text-xs text-muted-foreground mt-1">You have {pendingCount} pending task{pendingCount !== 1 ? 's' : ''}</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border bg-transparent hover:bg-muted/50 transition-colors">
          This Week <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="group flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-200 cursor-pointer"
          >
            <button 
              className="text-muted-foreground hover:text-primary transition-colors shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "text-sm font-medium truncate mb-1 transition-colors group-hover:text-primary",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.due}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <span className={cn("size-1.5 rounded-full", priorityDot[task.priority as keyof typeof priorityDot])} />
                  {task.priority}
                </span>
              </div>
            </div>

            <Image 
              src={task.avatar} 
              alt="Avatar" 
              width={32} 
              height={32} 
              className="rounded-full shrink-0 border-2 border-background shadow-sm"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={() => alert("Loading all tasks...")}
        className="w-full mt-4 py-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        View All Tasks →
      </button>
    </div>
  );
};

export default DashboardTasks;
