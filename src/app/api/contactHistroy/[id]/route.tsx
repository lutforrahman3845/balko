import { contactHistory } from "@/mock/contactHistory";
import { NextResponse } from "next/server";


// Get single contact by id
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { searchParams } = new URL(req.url);
        const { id } = await params;
        const historyMessage = contactHistory
            .filter((contact) => contact.contactId === id)
            .sort((a, b) => new Date(b.lastContacted).getTime() - new Date(a.lastContacted).getTime());
        const pageIndex = parseInt(searchParams.get("pageIndex") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");

        const total = historyMessage.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIdx = (pageIndex - 1) * pageSize;
        const data = historyMessage
            .slice(startIdx, startIdx + pageSize)
            .map((contact) => ({
                ...contact,
            }));

        if (!historyMessage) {
            return NextResponse.json(
                { error: { message: "Contact not found" } },
                { status: 404 },
            );
        }
        return NextResponse.json({
            data,
            meta: {
                pageIndex,
                pageSize,
                total,
                totalPages,
            },
        });

    } catch (error) {
        console.error("Error fetching contact:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 },
        );
    }
}