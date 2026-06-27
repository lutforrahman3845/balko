import { PaginationMeta } from "./pagination";


export interface Folder {
    id: string;
    parentFolderId: string | null;
    name: string;
    icon:
    | "requirements"
    | "design"
    | "contracts"
    | "organization"
    | "documents"
    | "folder"
    | "project"
    | "planning"
    | "development"
    | "database"
    | "api"
    | "frontend"
    | "backend"
    | "testing"
    | "deployment"
    | "security"
    | "finance"
    | "reports"
    | "meeting"
    | "assets"
    | "media"
    | "archive"
    | "settings"
    | "default";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}


export interface ExpandFolder extends Folder {
    parentFolder: Folder | null;
}

export interface GetFoldersResponse {
    data: ExpandFolder[];
    meta: PaginationMeta
}

// Form Schema
import { z } from "zod";

export const FolderFormSchema = z.object({
    name: z.string().min(1, "Folder name is required").max(100, "Folder name must be less than 100 characters"),
    parentFolderId: z.string().nullable().optional(),
    icon: z.enum([
        "requirements",
        "design",
        "contracts",
        "organization",
        "documents",
        "folder",
        "project",
        "planning",
        "development",
        "database",
        "api",
        "frontend",
        "backend",
        "testing",
        "deployment",
        "security",
        "finance",
        "reports",
        "meeting",
        "assets",
        "media",
        "archive",
        "settings",
        "default",
    ]).optional(),
});

export type FolderFormValues = z.infer<typeof FolderFormSchema>;