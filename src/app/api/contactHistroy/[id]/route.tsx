import { contactHistory } from "@/mock/contactHistory";
import { NextResponse } from "next/server";


// Get single contact by id
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const historyMessage = contactHistory.filter((contact) => contact.contactId === id);

        if (!historyMessage) {
            return NextResponse.json(
                { error: { message: "Contact not found" } },
                { status: 404 },
            );
        }
        return NextResponse.json(historyMessage);
    } catch (error) {
        console.error("Error fetching contact:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 },
        );
    }
}