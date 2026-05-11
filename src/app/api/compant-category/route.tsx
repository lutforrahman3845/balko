import { NextRequest, NextResponse } from "next/server";
import { COMPANY_CATEGORIES } from "@/mock/companyCategories";
import { CompanyCategory, GetCompanyCategoryResponse } from "@/@types/compantCategory";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';

    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    let filteredCategories = [...COMPANY_CATEGORIES];

    if (searchQuery) {
        filteredCategories = filteredCategories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredCategories.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedCategories = filteredCategories.slice(start, end);

    const response: GetCompanyCategoryResponse = {
        data: paginatedCategories,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    };

    return NextResponse.json(response);
}
