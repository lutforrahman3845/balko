export interface DocumentType {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectDocument {
    id: string;
    projectId: string;
    folderId: string | null
    description: string | null
    url: string;
    documentTypeId: string;
    isPublic: boolean
    uploadedBy: string;
    uploadedAt: string;
    updatedAt: string;
}