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
}

export interface ExpandedTask extends Task {
  creator: Employee | null;
  assignedEmployees: Employee[];
}

export interface GetTask {
  data: ExpandedTask[];
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Form Schema
import { z } from "zod";

export const TaskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  assignedEmployeeIds: z.array(z.string()).min(1, "Assigned employee is required"),
  status: z.enum(["pending", "in_progress", "completed", "blocked"]).optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
  dueAt: z.string().min(1, "Due date is required"),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;