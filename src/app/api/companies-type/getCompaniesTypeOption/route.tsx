import { CompanyTypesData } from "@/mock/companyType";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companyTypeOptions = CompanyTypesData.map((type) => ({
      id: type.id,
      name: type.name,
    }));
    return NextResponse.json(companyTypeOptions);
  } catch (error) {
    console.error("Error fetching company type options:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
