"use client";

import { CheckSquare, Download, DownloadIcon, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentHeader from "@/components/ContentHeader";
import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { ExpandedTask } from "@/@types/tassk";
import * as XLSX from "xlsx";

export function TaskHeader({ data }: { data: ExpandedTask[] }) {
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const exportToFormat = (format: "csv" | "xlsx") => {
    if (!data || data.length === 0) return;

    const exportData = data.map((task) => ({
      Title: task.title,
      Content: task.content || "",
      Creator: task.creator?.name || "N/A",
      Assigned: task.assignedEmployees.map((c) => c.name).join(", "),
      Status: task.status || "pending",
      Priority: task.priority || "medium",
      "Due Date": task.dueAt ? new Date(task.dueAt).toLocaleDateString() : "",
      "Created At": task.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    XLSX.writeFile(workbook, `tasks_${new Date().toISOString().slice(0, 10)}.${format}`, {
      bookType: format,
    });
  };

  return (
    <>
      <ContentHeader>
        <div className="flex flex-col items-start">
          <h1 className="inline-flex items-center gap-2.5 font-semibold">
            <CheckSquare className="size-6 text-primary" /> Tasks
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your tasks and track your progress
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" disabled={data.length === 0}>
                <DownloadIcon />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-57.5">
              {/* Export CSV */}
              <DropdownMenuItem
                className="gap-2"
                onClick={() => exportToFormat("csv")}
              >
                <Download />
                <span>Export view as CSV</span>
              </DropdownMenuItem>

              {/* Export Excel */}
              <DropdownMenuItem
                className="gap-2"
                onClick={() => exportToFormat("xlsx")}
              >
                <Share />
                <span>Export view as Excel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" onClick={() => setTaskFormOpen(true)}>
            <Plus /> New Task
          </Button>
        </div>
      </ContentHeader>

      <TaskFormModal open={taskFormOpen} onOpenChange={setTaskFormOpen} />
    </>
  );
}

