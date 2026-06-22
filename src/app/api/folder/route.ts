import { NextRequest, NextResponse } from "next/server";
import { mockFolderData } from "@/mock/folderData";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';
    const pageIndex = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('limit') || '10');

    let filteredFolders = [...mockFolderData];
    if (searchQuery) {
        filteredFolders = filteredFolders.filter(f =>
            f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredFolders.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedFolders = filteredFolders.slice(start, end);
    const FolderData = paginatedFolders.map(folder => {
        return {
            ...folder,
            parentFolder: mockFolderData.find(f => f.id === folder.parentFolderId) || null
        }
    })
    return NextResponse.json({
        data: FolderData,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.projectId) {
            return NextResponse.json({ error: "Missing required fields: name, projectId" }, { status: 400 });
        }

        // Auto-generate path if not provided
        let path = body.name;
        if (body.parentFolderId) {
            const parent = mockFolderData.find(f => f.id === body.parentFolderId);
            if (parent) {
                path = `${parent.path}/${body.name}`;
            }
        }

        const nextId = (Math.max(...mockFolderData.map(f => parseInt(f.id) || 0)) + 1).toString();

        const newFolder = {
            id: nextId,
            projectId: body.projectId,
            parentFolderId: body.parentFolderId || null,
            name: body.name,
            path: body.path || path,
            color: body.color || "#3B82F6",
            icon: body.icon || "default",
            createdBy: body.createdBy || "1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockFolderData.push(newFolder);
        return NextResponse.json(newFolder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
    }
}
