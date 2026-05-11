import { COMPANY_CATEGORIES } from "@/mock/companyCategories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const companyCategory = COMPANY_CATEGORIES.find((r) => r.id === id);

    if (!companyCategory) {
        return NextResponse.json({ message: "Company Category not found" }, { status: 404 });
    }

    return NextResponse.json(companyCategory);
}
