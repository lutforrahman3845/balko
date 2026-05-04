import { NextRequest, NextResponse } from "next/server";
import { rolesData } from "@/mock/roleData";
import { GetAllRoleResponse } from "@/@types/role";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';

    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    let filteredRoles = [...rolesData];

    if (searchQuery) {
        filteredRoles = filteredRoles.filter(role =>
            role.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredRoles.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedRoles = filteredRoles.slice(start, end);

    const response: GetAllRoleResponse = {
        data: paginatedRoles,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    };

    return NextResponse.json(response);
}
