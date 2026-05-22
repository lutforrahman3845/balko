import { NextRequest, NextResponse } from "next/server";
import { CompanyTypesData } from "@/mock/companyType";
import { GetCompanyTypeResponse } from "@/@types/companiesType";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';

    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    let filteredCompanyTypes = [...CompanyTypesData];

    if (searchQuery) {
        filteredCompanyTypes = filteredCompanyTypes.filter(type =>
            type.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredCompanyTypes.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedCompanyTypes = filteredCompanyTypes.slice(start, end);

    const response: GetCompanyTypeResponse = {
        data: paginatedCompanyTypes,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    };

    return NextResponse.json(response);
}
