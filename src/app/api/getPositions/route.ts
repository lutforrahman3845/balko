import { NextResponse } from "next/server";
import { mockContacts } from "@/mock/contacts";

export async function GET() {
  try {
    const uniquePositions = Array.from(new Set(mockContacts.map(c => c.position).filter(Boolean)));
    const positions = uniquePositions.map(pos => ({
      id: pos.toLocaleLowerCase().replace(" ", "-"),
      name: pos
    }));

    return NextResponse.json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
