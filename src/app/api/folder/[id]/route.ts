import { NextRequest, NextResponse } from "next/server";
import { mockFolderData } from "@/mock/folderData";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const folder = mockFolderData.find((f) => f.id === id);

    if (!folder) {
        return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    return NextResponse.json(folder);
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
