import { COMPANY_CATEGORIES } from "@/mock/companyCategories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categoryOptions = COMPANY_CATEGORIES.map((category) => ({
      id: category.id,
      name: category.name,
    }));
    return NextResponse.json(categoryOptions);
  } catch (error) {
    console.error("Error fetching company category options:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
