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
    displayName: z.string().min(1, "Display Name is required"),
    description: z.string().optional(),
});

export type RoleFormValues = z.infer<typeof RoleFormSchema>;

