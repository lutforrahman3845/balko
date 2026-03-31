import { NextResponse } from "next/server";
import { tasksData } from "@/mock/taskData";
import { employeeData } from "@/mock/employeeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const active = searchParams.get("active");
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const statusesParam = searchParams.get("statuses");
    const statuses = statusesParam
      ? statusesParam.split(",").filter(Boolean)
      : [];
    const prioritiesParam = searchParams.get("priorities");
    const priorities = prioritiesParam
      ? prioritiesParam.split(",").filter(Boolean)
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
          task.id?.includes(searchQuery),
      );
    }

    const now = new Date();
    if (active === "today") {
      filtered = filtered.filter((task) => {
        const date = new Date(task.createdAt);
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      });
    } else if (active === "week") {
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
      const assignedContacts =
        task.assignedContactIds
          ?.map((id) => employeeData.find((c) => c.id === id))
          .filter(Boolean) || [];
      return {
        ...task,
        creator,
        assignedContacts,
      };
    });

    // Return the required structure
    return NextResponse.json({
      data: expandedTasks,
      total,
      totalPages,
      pageIndex,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
