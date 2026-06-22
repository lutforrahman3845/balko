import { PaginationMeta } from "./pagination";


export interface Folder {
    id: string;
    parentFolderId: string | null;
    name: string;
    path: string | null;
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