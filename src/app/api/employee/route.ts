import { NextResponse } from "next/server";
import { employeeData } from "@/mock/employeeData";
import { departmentData } from "@/mock/departmentData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extract parameters
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statusesParam = searchParams.get("status");
    const departmentsParam = searchParams.get("departmentId");
    const employeeTypesParam = searchParams.get("employeeType");
    const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const statuses = statusesParam ? statusesParam.split(",").filter(Boolean) : [];
    const departmentIds = departmentsParam ? departmentsParam.split(",").filter(Boolean) : [];
    const employeeTypes = employeeTypesParam ? employeeTypesParam.split(",").filter(Boolean) : [];

    // 1. Filter Employees
    let filtered = [...employeeData];

    // Search Query (Name, Email, Designation)
    if (searchQuery) {
      filtered = filtered.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(searchQuery) ||
          emp.email?.toLowerCase().includes(searchQuery) ||
          emp.designation?.toLowerCase().includes(searchQuery) ||
          emp.id?.includes(searchQuery)
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

    // Employee Type Filter
    if (employeeTypes.length > 0) {
      filtered = filtered.filter((emp) => emp.employeeType && employeeTypes.includes(emp.employeeType));
    }

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered.sort((a: any, b: any) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      
      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      }
      
      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "desc" 
          ? valB.localeCompare(valA) 
          : valA.localeCompare(valB);
      }
      
      return 0;
    });

    // 3. Pagination Math
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIdx = (pageIndex - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    const paginatedEmployees = filtered.slice(startIdx, endIdx);

    // 4. Expand Related Data (Department)
    const expandedEmployees = paginatedEmployees.map((emp) => {
      const department =
        departmentData.find((dept) => dept.id === emp.departmentId) || null;
      return {
        ...emp,
        department,
      };
    });

    // Return final response
    return NextResponse.json({
      data: expandedEmployees,
      total,
      totalPages,
      pageIndex,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
