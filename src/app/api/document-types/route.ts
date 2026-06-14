import { NextResponse } from "next/server";
import { mockDocumentType } from "@/mock/documentType";

export async function GET() {
  return NextResponse.json({ data: mockDocumentType, total: mockDocumentType.length });
}
