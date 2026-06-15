import { PaginationMeta } from "./pagination";


export interface Folder {
    id: string;
    projectId: string | null;
    parentFolderId: string | null;
    name: string;
    path: string | null;
    color: string | null;
    icon: string
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetFoldersResponse {
    data: Folder[];
    meta: PaginationMeta
}