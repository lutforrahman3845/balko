import { NextResponse } from "next/server";
import { mockContacts } from "@/mock/contacts";
import { COMPANIES } from "@/mock/companies";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statusParam = searchParams.get("status");
    const positionParam = searchParams.get("position");
    const lastContactedParam = searchParams.get("lastContacted");
    const statuses = statusParam
      ? statusParam.split(",").filter(Boolean)
      : [];
    const positions = positionParam
      ? positionParam.split(",").filter(Boolean)
      : [];
    const lastContacted = lastContactedParam
      ? lastContactedParam.split(",").filter(Boolean)
      : [];
    const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    let filtered = [...mockContacts];

    // Search
    if (searchQuery) {
      filtered = filtered.filter((contact) => {
        const company = COMPANIES.find((c) => c.id === contact.companyId);
        return (
          contact.name?.toLowerCase().includes(searchQuery) ||
          contact.email?.toLowerCase().includes(searchQuery) ||
          contact.position?.toLowerCase().includes(searchQuery) ||
          company?.name?.toLowerCase().includes(searchQuery)
        );
      });
    }

    // Statuses
    if (statuses.length > 0) {
      filtered = filtered.filter(
        (contact) => contact.status && statuses.includes(contact.status),
      );
    }
   // position
    if (positions.length > 0) {
      filtered = filtered.filter(
        (contact) => contact.position && positions.includes(contact.position),
      );
    }

    //oldest to newest last contacted
    if (lastContacted.length > 0) {
      filtered = filtered.filter(
        (contact) => contact.lastContacted && lastContacted.includes(contact.lastContacted),
      );
    }

    // Sort by newest created
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIdx = (pageIndex - 1) * pageSize;
    const data = filtered.slice(startIdx, startIdx + pageSize).map((contact) => ({
      ...contact,
      company: COMPANIES.find((c) => c.id === contact.companyId) || null,
    }));

    return NextResponse.json({
      data,
      total,
      totalPages,
      pageIndex,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
