import { mockDocuments } from "@/mock/documents";
import { mockDocumentType } from "@/mock/documentType";
import { employeeData } from "@/mock/employeeData";
import { mockFolderData } from "@/mock/folderData";
import { mockProjects } from "@/mock/projectData";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const projectId = searchParams.get('projectId') || '';
        const pageIndex = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('limit') || '10');
        const recent = searchParams.get('recent') || '';

        let filteredDocuments = [...mockDocuments];

        if (projectId) {
            filteredDocuments = filteredDocuments.filter(f => f.projectId === projectId);
        }
        if (recent) {
            filteredDocuments.sort((a, b) => {
                const dateA = new Date(a.uploadedAt).getTime();
                const dateB = new Date(b.uploadedAt).getTime();
                return recent === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }

        const total = filteredDocuments.length;
        const totalPages = Math.ceil(total / pageSize);
        const start = (pageIndex - 1) * pageSize;
        const end = start + pageSize;

        const paginatedDocuments = filteredDocuments.slice(start, end);
        const documentData = paginatedDocuments.map((document) => {
            return {
                ...document,
                folder: {
                    id: document?.folderId,
                    name: mockFolderData.find(f => f.id === document?.folderId)?.name || ""
                },
                project: document?.projectId ? {
                    id: document?.projectId,
                    name: mockProjects.find(f => f.id === document?.projectId)?.name || ""
                } : null,
                documentType: {
                    id: document?.documentTypeId,
                    name: mockDocumentType.find(f => f.id === document?.documentTypeId)?.name || ""
                },
                uploadedByEmployee: {
                    id: document?.uploadedBy,
                    name: employeeData.find(e => e.id === document?.uploadedBy)?.name || "",
                    avatar: employeeData.find(e => e.id === document?.uploadedBy)?.avatar || ""
                },
                shareWithEmployee: (document?.shareWith && document?.shareWith?.length > 0) ?
                    document?.shareWith.map(shareId => {
                        return {
                            id: shareId,
                            name: employeeData.find(e => Number(e.id) === Number(shareId))?.name || "",
                            avatar: employeeData.find(e => Number(e.id) === Number(shareId))?.avatar || ""
                        }
                    }) : null
            }
        })

        return NextResponse.json({
            data: documentData,
            meta: {
                pageIndex,
                pageSize,
                total,
                totalPages,
            },
        });

    } catch (error) {
        return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
    }
}