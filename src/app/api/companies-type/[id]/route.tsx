import { CompanyTypesData } from "@/mock/companyType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const companyType = CompanyTypesData.find((r) => r.id === id);

    if (!companyType) {
        return NextResponse.json({ message: "Company Type not found" }, { status: 404 });
    }

    return NextResponse.json(companyType);
}
