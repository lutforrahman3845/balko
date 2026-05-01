import { NextRequest, NextResponse } from "next/server";
import { departmentData } from "@/mock/departmentData";
import { employeeData } from "@/mock/employeeData";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const department = departmentData.find((d) => d.id === id);

    if (!department) {
        return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }

    // Expand Department
    const departmentHead = employeeData.find(
        (emp) => emp.id.toString() === department.departmentHeadId?.toString()
    );
    const parentDepartment = departmentData.find(
        (d) => d.id === department.parentDepartmentId
    );

    const expandedDepartment = {
        ...department,
        departmentHead,
        parentDepartment,
    };

    return NextResponse.json(expandedDepartment);
}
