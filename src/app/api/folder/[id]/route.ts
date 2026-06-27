import { NextRequest, NextResponse } from "next/server";
import { mockFolderData } from "@/mock/folderData";
import { mockDocuments } from "@/mock/documents";
import { mockProjects } from "@/mock/projectData";
import { mockDocumentType } from "@/mock/documentType";
import { employeeData } from "@/mock/employeeData";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const folder = mockFolderData.find((f) => f.id === id);
    const folderDocuments = mockDocuments.filter(d => d.folderId === folder?.id) || []
    const folderData = {
        id: folder?.id,
        name: folder?.name,
        icon: folder?.icon,
        createdBy: {
            id: folder?.createdBy,
            name: employeeData.find(e => e.id === folder?.createdBy)?.name || "",
            avatar: employeeData.find(e => e.id === folder?.createdBy)?.avatar || "",
            designation: employeeData.find(e => e.id === folder?.createdBy)?.designation || ""
        },
        parentFolderId: folder?.parentFolderId || null,
        parentFolder: folder?.parentFolderId ? mockFolderData.find(f => f.id === folder?.parentFolderId) : null,
        childFolders: mockFolderData.filter(f => f.parentFolderId === folder?.id) || [],
        createdAt: folder?.createdAt,
        updatedAt: folder?.updatedAt,
        documents: folderDocuments?.length > 0 ? folderDocuments?.map((document) => ({
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
                avatar: employeeData.find(e => e.id === document?.uploadedBy)?.avatar || "",
                designation: employeeData.find(e => e.id === document?.uploadedBy)?.designation || ""
            },
            shareWithEmployee: (document?.shareWith && document?.shareWith?.length > 0) ?
                document?.shareWith.map(shareId => {
                    return {
                        id: shareId,
                        name: employeeData.find(e => Number(e.id) === Number(shareId))?.name || "",
                        avatar: employeeData.find(e => Number(e.id) === Number(shareId))?.avatar || "",
                        designation: employeeData.find(e => Number(e.id) === Number(shareId))?.designation || ""
                    }
                }) : null
        }))
            : null
    }

    if (!folder) {
        return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    return NextResponse.json(folderData);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const index = mockFolderData.findIndex((f) => f.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Folder not found" }, { status: 404 });
        }

        mockFolderData[index] = {
            ...mockFolderData[index],
            ...body,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json(mockFolderData[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update folder" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const index = mockFolderData.findIndex((f) => f.id === id);

    if (index === -1) {
        return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    mockFolderData.splice(index, 1);
    return NextResponse.json({ success: true });
}
