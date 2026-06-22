import { PaginationMeta } from "./pagination";

export interface DocumentType {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface document {
    id: string;
    projectId: string | null;
    folderId: string
    description: string | null
    url: string;
    documentTypeId: string;
    isPublic: boolean
    // shearWith:number | null
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
}

export interface GetDocumentsResponse {
    data: document[];
    meta: PaginationMeta;
}