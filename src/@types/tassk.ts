import { Employee } from "./employee";
import { Contact } from "./contact";
import { Company } from "./company";
import { Deal } from "./deal";

export interface Task {
  id: string;
  title: string;
  content: string;
  companyIds?: string[];
  contactIds?: string[];
  dealIds?: string[];
  createdBy: string;
  dueAt: string;
  completedAt?: string;
  completedBy?: string;
  assignedContactIds?: string[];
  status?: "pending" | "completed" | "in_progress" | "blocked";
  priority?: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
}

export interface ExpandedTask extends Task {
  creator: Employee | null;
  assignedContacts: Contact[];
  companies: Company[];
  deals: Deal[];
}

export interface GetTask {
  data: ExpandedTask[];
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
