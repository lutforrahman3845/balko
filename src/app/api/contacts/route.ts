import { NextResponse } from "next/server";
import { mockContacts } from "@/mock/contacts";
import { COMPANIES } from "@/mock/companies";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statuses = searchParams.get("status");
    const positionParam = searchParams.get("position");
    const lastContactedParam = searchParams.get("lastContacted");

    const positions = positionParam
      ? positionParam.split(",").filter(Boolean)
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
    if (statuses === "leads") {
      filtered = filtered.filter((contact) => contact.status === "leads");
    } else if (statuses === "follow-ups") {
      filtered = filtered.filter((contact) => contact.status === "follow-ups");
    } else if (statuses === "pipeline") {
      filtered = filtered.filter((contact) => contact.status === "pipeline");
    } else if (statuses === "client") {
      filtered = filtered.filter((contact) => contact.status === "client");
    }
    // position 
    if (positions.length > 0) {
      filtered = filtered.filter(
        (contact) =>
          contact.position && positions.includes(contact.position.toLowerCase()),
      );
    }

    // lastContacted is now used for sorting
    if (lastContactedParam === "asc") {
      filtered.sort(
        (a, b) =>
          new Date(a.lastContacted).getTime() -
          new Date(b.lastContacted).getTime(),
      );
    } else if (lastContactedParam === "desc") {
      filtered.sort(
        (a, b) =>
          new Date(b.lastContacted).getTime() -
          new Date(a.lastContacted).getTime(),
      );
    } else {
      // Default Sort by newest created
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIdx = (pageIndex - 1) * pageSize;
    const data = filtered
      .slice(startIdx, startIdx + pageSize)
      .map((contact) => ({
        ...contact,
        company: COMPANIES.find((c) => c.id === contact.companyId) || null,
      }));

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
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
