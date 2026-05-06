import { Department } from "./department";
import { Employee, ExpandedEmployee } from "./employee";
import { PaginationMeta } from "./pagination";

export interface Team {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    departmentId: string;
    teamLeaderId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExpandedTeam extends Team {
    department: Department | null;
    teamLeader: Employee | null;
}


export interface GetAllTeamResponse {
    data: ExpandedTeam[];
    meta: PaginationMeta;
}

export interface ExpandedSingleTeam extends Team {
    department: Department | null;
    teamLeader: ExpandedEmployee | null;
    teamMembers: ExpandedEmployee[];
}


import { z } from "zod";

export const TeamFormSchema = z.object({
    name: z.string().min(1, "Team name is required").trim().max(100, "Team name must be less than 100 characters"),
    description: z.string().trim().optional(),
    departmentId: z.string().min(1, "Department is required"),
    teamLeaderId: z.string().min(1, "Team leader is required"),
    teamMembers: z.array(z.string()).optional()
});

export type TeamFormValues = z.infer<typeof TeamFormSchema>;