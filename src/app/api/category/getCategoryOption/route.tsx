import { CATEGORIES } from "@/mock/categories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categoryOptions = CATEGORIES.map((category) => ({
      id: category.id,
      name: category.name,
      color: category.color,
    }));
    return NextResponse.json(categoryOptions);
  } catch (error) {
    console.error("Error fetching category options:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
