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
export type FolderDocument = {
    id: string;
    projectId: string | null;
    folderId: string;
    description: string;
    url: string;
    documentTypeId: string;
    isPublic: boolean;
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
    shareWith: number[] | null;
    folder: {
        id: string;
        name: string;
        icon:Folder["icon"]
    };
    project: {
        id: string;
        name: string;
    } | null;
    documentType: {
        id: string;
        name: string;
    };
    uploadedByEmployee: {
        id: string;
        name: string;
        avatar: string;
        designation: string;
    };
    shareWithEmployee: {
        id: number;
        name: string;
        avatar: string;
        designation: string;
    }[] | null;
}
export interface SingLeFolder {
    id: string;
    name: string;
    icon: Folder["icon"];
    createdBy: {
        id: string;
        name: string;
        avatar: string;
        designation: string;
    };
    parentFolderId: string | null;
    parentFolder: Folder | null;
    childFolders: Folder[];
    createdAt: string;
    updatedAt: string;
    documents: FolderDocument[] | null;
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

export const DocumentUploadSchema = z.object({
    projectId: z.string().nullable().optional(),
    folderId: z.string().min(1, "Folder is required"),
    description: z.string().nullable().optional(),
    file: z.union([z.instanceof(File, { message: "File is required" }), z.string()]),
    documentTypeId: z.string().min(1, "Document type is required"),
    isPublic: z.boolean().default(false).optional(),
    shareWith: z.array(z.number()).nullable().optional(),
});

export type DocumentFormValues = z.infer<typeof DocumentUploadSchema>;