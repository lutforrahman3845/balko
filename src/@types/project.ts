
export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";
export type ProjectPriority = "high" | "medium" | "low";
export type ProjectType = "client" | "internal";

export interface Project {
    id: string;
    name: string;
    description: string;
    thumbnail: string | null;
    type: ProjectType;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: string;
    endDate: string | null;
    managerId: string;
    teamIds: string[];
    departmentId: string | null;
    companyId: string | null;
    contactPersonId: string | null;
    budget: number;
    currency: string;
    progress: number;
    createdAt: string;
    updatedAt: string;
}



export interface ExpandedProject extends Project {
    manager: Employee;
    teams: ExpandedSingleTeam[];
    department: Department | null;
    company: Company | null;
    contactPerson: Contact | null;
}

export interface GetProject {
    data: ExpandedProject[]
    meta: PaginationMeta;
}


// Form Schema
import { z } from "zod";
import { Employee } from "./employee";
import { ExpandedSingleTeam } from "./team";
import { Department } from "./department";
import { Company } from "./company";
import { Contact } from "./contact";
import { PaginationMeta } from "./pagination";

export const ProjectFormSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    thumbnail: z.string().nullable().optional(),
    type: z.enum(["client", "internal"]),
    status: z.enum(["planning", "active", "on_hold", "completed", "cancelled"]),
    priority: z.enum(["high", "medium", "low"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().nullable().optional(),
    managerId: z.string().min(1, "Project manager is required"),
    teamIds: z.array(z.string()).min(1, "At least one team must be assigned"),
    departmentId: z.string().nullable().optional(),
    companyId: z.string().nullable().optional(),
    contactPersonId: z.string().nullable().optional(),
    budget: z.number().default(0),
    currency: z.string().default("USD"),
    progress: z.number().min(0).max(100).default(0),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
