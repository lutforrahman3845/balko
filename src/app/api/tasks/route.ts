import { NextResponse } from "next/server";
import { tasksData } from "@/mock/taskData";
import { employeeData } from "@/mock/employeeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statusParam = searchParams.get("status");
    const timeFrameParam = searchParams.get("timeFrame");
    const statuses = statusParam
      ? statusParam.split(",").filter(Boolean)
      : [];
    const priorityParam = searchParams.get("priority");
    const priorities = priorityParam
      ? priorityParam.split(",").filter(Boolean)
      : [];
    const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    // 1. Filter Tasks
    let filtered = [...tasksData];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchQuery) ||
          task.content?.toLowerCase().includes(searchQuery) ||
          task.assignedEmployeeIds?.some((id) =>
            employeeData
              .find((emp) => emp.id === id)
              ?.name.toLowerCase()
              .includes(searchQuery),
          ),
      );
    }

    const now = new Date();
    if (timeFrameParam === "today") {
      filtered = filtered.filter((task) => {
        const date = new Date(task.createdAt);
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      });
    } else if (timeFrameParam === "week") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter((task) => {
        const date = new Date(task.createdAt);
        return date >= oneWeekAgo && date <= now;
      });
    }

    // Statuses
    if (statuses.length > 0) {
      filtered = filtered.filter(
        (task) => task.status && statuses.includes(task.status),
      );
    }

    // Priorities
    if (priorities.length > 0) {
      filtered = filtered.filter(
        (task) => task.priority && priorities.includes(task.priority),
      );
    }

    // Sort by newest created
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // 2. Pagination Math
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIdx = (pageIndex - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    const paginatedTasks = filtered.slice(startIdx, endIdx);

    // 3. Expand related data
    const expandedTasks = paginatedTasks.map((task) => {
      const creator =
        employeeData.find((emp) => emp.id === task.createdBy) || null;
      const assignedEmployees =
        task.assignedEmployeeIds
          ?.map((id) => employeeData.find((c) => c.id === id))
          .filter(Boolean) || [];
      return {
        ...task,
        creator,
        assignedEmployees,
      };
    });

    // Return the required structure
    return NextResponse.json({
      data: expandedTasks,
      meta: {
        pageIndex,
        pageSize,
        total,
        totalPages,
      }
    });

  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}