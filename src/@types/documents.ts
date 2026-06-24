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
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
    shareWith: number[] | null
}

export interface ExpandedDocument extends document {
    folder: {
        id: string;
        name: string;
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
    };
    shareWithEmployee: {
        id: number;
        name: string;
        avatar: string;
    }[] | null;
}

export interface GetDocumentsResponse {
    data: ExpandedDocument[];
    meta: PaginationMeta;
}