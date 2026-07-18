import { Employee } from "./employee";
export interface Task {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  completedBy?: string;
  assignedEmployeeIds?: string[];
  status: "pending" | "completed" | "in_progress" | "blocked";
  priority?: "high" | "medium" | "low";
  dueAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string | null;
}

export interface ExpandedTask extends Task {
  creator: Employee | null;
  assignedEmployees: Employee[];
  project: Project | null;
}

import { PaginationMeta } from "./pagination";

export interface GetTask {
  data: ExpandedTask[];
  meta: PaginationMeta;
}


// Form Schema
import { z } from "zod";
import { Project } from "./project";

export const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  assignedEmployeeIds: z.array(z.string()).min(1, "Assigned employee is required"),
  status: z.enum(["pending", "in_progress", "completed", "blocked"]).optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  dueAt: z.string().min(1, "Due date is required"),
  projectId: z.string().nullable().optional(),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;