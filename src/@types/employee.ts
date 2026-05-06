import { Department } from "./department";
import { PaginationMeta } from "./pagination";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string | null;
  designation?: string | null;
  employeeType: 'full_time' | 'part_time' | 'contractor' | 'intern';
  departmentId: string;
  avatar: string | null;
  roleId: string
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;

}

import { Role } from "./role";

export interface ExpandedEmployee extends Employee {
  department: Department;
  role: Role;
}

export interface GetEmployee {
  data: ExpandedEmployee[];
  meta: PaginationMeta;

}
export interface ExpandedSingleEmployee extends ExpandedEmployee {
  teams: {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    joinedAt?: string;
    teamMemberId: string;
    teamLeader?: Employee | null;
    createdAt: string;
    updatedAt: string;
    roleInTeam?: Role | null;
  }[];
}



// Form Schema
import { z } from "zod";

export const EmployeeFormSchema = z.object({
  avatar: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
  designation: z.string().min(1, "Designation is required"),
  employeeType: z.enum(["full_time", "part_time", "contractor", "intern"]).optional(),
  departmentId: z.string().min(1, "Department is required"),
  roleId: z.string().min(1, "Role is required"),
  teamIds: z.array(z.string()).optional().nullable(),
});

export type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>;