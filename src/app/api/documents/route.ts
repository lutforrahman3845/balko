import { mockDocuments } from "@/mock/documents";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

        return NextResponse.json({
            data: paginatedDocuments,
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