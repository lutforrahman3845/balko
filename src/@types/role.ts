import { z } from "zod";

export interface Role {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface GetAllRoleResponse {
    data: Role[];
    meta: {
        pageIndex: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export const RoleFormSchema = z.object({
    displayName: z.string().min(1, "Role Name is required").max(100, "Name must be less than 100 characters"),
    description: z.string().optional(),
});

export type RoleFormValues = z.infer<typeof RoleFormSchema>;

