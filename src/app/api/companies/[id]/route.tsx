import { NextResponse } from "next/server";
import { COMPANIES } from "@/mock/companies";
import { CATEGORIES } from "@/mock/categories";
import { mockContacts } from "@/mock/contacts";

// GET single company by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const company = COMPANIES.find((c) => c.id === id);
    
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Expand categories for detailed view
    const expandedCompany = {
      ...company,
      categories: (company.categoryIds || [])
        .map(catId => CATEGORIES.find(cat => cat.id === catId))
        .filter(Boolean),
      contacts: (company.contactIds || [])
        .map(contactId => mockContacts.find(contact => contact.id === contactId))
        .filter(Boolean)
    };

    return NextResponse.json(expandedCompany);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}

// UPDATE single company
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const company = COMPANIES.find((c) => c.id === id);

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Simulate update
    const updatedCompany = {
      ...company,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // In a real mock server we might update the in-memory array
    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}

// DELETE single company
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const company = COMPANIES.find((c) => c.id === id);

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Simulate deletion
    return NextResponse.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
