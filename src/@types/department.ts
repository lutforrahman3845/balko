import { Employee } from "./employee";

export interface Department {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    parentDepartmentId?: string | null;
    departmentHeadId?: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface ExpandedDepartment extends Department {
    departmentHead: Employee;
    parentDepartment: Department;
}

import { PaginationMeta } from "./pagination";

export interface GetAllDepartmentResponse {
    data: ExpandedDepartment[];
    meta: PaginationMeta;
}

// Form Schema
import { z } from "zod";

export const DepartmentFormSchema = z.object({
    displayName: z.string().min(1, "Department name is required"),
    description: z.string().optional(),
    parentDepartmentId: z.string().nullable().optional(),
    departmentHeadId: z.string().nullable().optional(),
});

export type DepartmentFormValues = z.infer<typeof DepartmentFormSchema>;
