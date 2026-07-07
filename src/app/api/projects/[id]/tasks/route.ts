import { NextResponse } from "next/server";
import { tasksData } from "@/mock/taskData";
import { employeeData } from "@/mock/employeeData";
import { mockProjects } from "@/mock/projectData";

// Get all tasks that belong to a single project (expanded, board-friendly).
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: projectId } = await params;
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const priorityParam = searchParams.get("priority");
    const priorities = priorityParam
      ? priorityParam.split(",").filter(Boolean)
      : [];

    let filtered = tasksData.filter((task) => task.projectId === projectId);

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchQuery) ||
          task.content?.toLowerCase().includes(searchQuery) ||
          task.assignedEmployeeIds?.some((empId) =>
            employeeData
              .find((emp) => emp.id === empId)
              ?.name.toLowerCase()
              .includes(searchQuery),
          ),
      );
    }

    if (priorities.length > 0) {
      filtered = filtered.filter(
        (task) => task.priority && priorities.includes(task.priority),
      );
    }

    // Sort by newest created (board re-orders within columns client-side).
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const project = mockProjects.find((p) => p.id === projectId) || null;

    const expandedTasks = filtered.map((task) => {
      const creator =
        employeeData.find((emp) => emp.id === task.createdBy) || null;
      const assignedEmployees =
        task.assignedEmployeeIds
          ?.map((empId) => employeeData.find((emp) => emp.id === empId))
          .filter(Boolean) || [];

      return {
        ...task,
        creator,
        assignedEmployees,
        project,
      };
    });

    return NextResponse.json({
      data: expandedTasks,
      meta: {
        pageIndex: 1,
        pageSize: expandedTasks.length,
        total: expandedTasks.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}