import { NextRequest, NextResponse } from "next/server";
import { departmentData } from "@/mock/departmentData";
import { employeeData } from "@/mock/employeeData";
import { ExpandedDepartment, GetAllDepartmentResponse } from "@/@types/department";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    let filteredDepartments = [...departmentData];

    if (searchQuery) {
        filteredDepartments = filteredDepartments.filter(dept =>
            dept.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredDepartments.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedDepartments = filteredDepartments.slice(start, end);

    const expandedDepartments: ExpandedDepartment[] = paginatedDepartments.map(dept => {
        const departmentHead = employeeData.find(emp => emp.id === dept.departmentHeadId?.toString()) || null;
        const parentDepartment = departmentData.find(d => d.id === dept.parentDepartmentId) || null;

        return {
            ...dept,
            departmentHead: departmentHead,
            parentDepartment: parentDepartment
        } as ExpandedDepartment;
    });

    const response: GetAllDepartmentResponse = {
        data: expandedDepartments,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    };

    return NextResponse.json(response);
}
