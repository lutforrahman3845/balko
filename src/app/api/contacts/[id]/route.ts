import { NextResponse } from "next/server";
import { mockContacts } from "@/mock/contacts";
import { COMPANIES } from "@/mock/companies";

// Get single contact by id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const contact = mockContacts.find((c) => c.id === id);
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    const company = COMPANIES.find((c) => c.id === contact.companyId) || null;
    return NextResponse.json({ ...contact, company });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
