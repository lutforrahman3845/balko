import { CompanyInteractionHistory } from "@/mock/CompanyInteractionHistory";
import { contactHistory } from "@/mock/contactHistory";
import { COMPANIES } from "@/mock/companies";
import { mockContacts } from "@/mock/contacts";
import { NextResponse } from "next/server";


// Get single contact by id
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { searchParams } = new URL(req.url);
        const { id } = await params;
        const company = COMPANIES.find((c) => c.id === id);
        const companyContactIds = company?.contactIds || [];

        const companyHistory = CompanyInteractionHistory.filter((history) => history.companyId === id);

        const contactInteractionHistory = contactHistory
            .filter((h) => companyContactIds.includes(h.contactId))
            .map((h) => {
                const contact = mockContacts.find((c) => c.id === h.contactId);
                return {
                    ...h,
                    contact: contact ? {
                        id: contact.id,
                        name: contact.name,
                        avatar: contact.avatar,
                        email: contact.email,
                        phone: contact.phone,
                        position: contact.position,
                    } : null,
                    lastInteractionAt: h.lastContacted,
                };
            })

        const historyMessage = [...companyHistory, ...contactInteractionHistory]
            .sort((a: any, b: any) => new Date(b.lastInteractionAt).getTime() - new Date(a.lastInteractionAt).getTime());

        const pageIndex = parseInt(searchParams.get("pageIndex") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");

        const total = historyMessage.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIdx = (pageIndex - 1) * pageSize;
        const paginatedSlice = historyMessage.slice(startIdx, startIdx + pageSize);

        const data = {
            companyConatact: paginatedSlice.filter((item: any) => 'companyId' in item && !('contactId' in item)),
            conatactsHistory: paginatedSlice
                .filter((item: any) => 'contactId' in item)
                .map(({ lastInteractionAt, ...rest }: any) => rest)
        };

        return NextResponse.json({
            data,
            total,
            totalPages,
            pageIndex,
            pageSize,
        });
    } catch (error) {
        console.error("Error fetching contact:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 },
        );
    }
}