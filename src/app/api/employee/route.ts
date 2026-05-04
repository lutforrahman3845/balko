import { NextResponse } from "next/server";
import { employeeData } from "@/mock/employeeData";
import { departmentData } from "@/mock/departmentData";
import { rolesData } from "@/mock/roleData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statusesParam = searchParams.get("status");
    const departmentsParam = searchParams.get("departmentId");
    const rolesParam = searchParams.get("roleId");
    const employeeTypesParam = searchParams.get("employeeType");

    const statuses = statusesParam ? statusesParam.split(",").filter(Boolean) : [];
    const departmentIds = departmentsParam ? departmentsParam.split(",").filter(Boolean) : [];
    const roleIds = rolesParam ? rolesParam.split(",").filter(Boolean) : [];
    const employeeTypes = employeeTypesParam ? employeeTypesParam.split(",").filter(Boolean) : [];

    // 1. Filter Employees
    let filtered = [...employeeData];

    // Search Query (Name, Email, Designation)
    if (searchQuery) {
      filtered = filtered.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(searchQuery) ||
          emp.email?.toLowerCase().includes(searchQuery) ||
          emp.designation?.toLowerCase().includes(searchQuery)
      );
    }

    // Status Filter
    if (statuses.length > 0) {
      filtered = filtered.filter((emp) => emp.status && statuses.includes(emp.status));
    }

    // Department Filter
    if (departmentIds.length > 0) {
      filtered = filtered.filter((emp) => emp.departmentId && departmentIds.includes(emp.departmentId));
    }

    // Role Filter
    if (roleIds.length > 0) {
      filtered = filtered.filter((emp) => emp.roleId && roleIds.includes(emp.roleId));
    }

    // Employee Type Filter
    if (employeeTypes.length > 0) {
      filtered = filtered.filter((emp) => emp.employeeType && employeeTypes.includes(emp.employeeType));
    }

    // 3. Pagination Math
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIdx = (pageIndex - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    const paginatedEmployees = filtered.slice(startIdx, endIdx);

    // 4. Expand Related Data (Department, Role, Teams)
    const expandedEmployees = paginatedEmployees.map((emp) => {
      const department =
        departmentData.find((dept) => dept.id === emp.departmentId) || null;
      const role = rolesData.find((r) => r.id === emp.roleId) || null;
      


      return {
        ...emp,
        department,
        role
      };
    });


    // Return final response
    return NextResponse.json({
      data: expandedEmployees,
      meta: {
        pageIndex,
        pageSize,
        total,
        totalPages,
      },
    });

  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
}

