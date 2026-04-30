import { NextResponse } from "next/server";
import { tasksData } from "@/mock/taskData";
import { employeeData } from "@/mock/employeeData";

// Get single task by id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const task = tasksData.find((t) => t.id === id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    const creator =
      employeeData.find((emp) => emp.id === task.createdBy) || null;
    const assignedEmployees =
      task.assignedEmployeeIds
        ?.map((id) => employeeData.find((c) => c.id === id))
        .filter(Boolean) || [];
    return NextResponse.json({ ...task, creator, assignedEmployees });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status, notes } = await req.json();

    const taskIndex = tasksData.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update the mock data
    tasksData[taskIndex] = {
      ...tasksData[taskIndex],
      status: status || tasksData[taskIndex].status,
      // In a real app we would save notes too
    };

    return NextResponse.json({ success: true, data: tasksData[taskIndex] });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
