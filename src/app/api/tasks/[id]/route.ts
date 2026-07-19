import { NextResponse } from "next/server";
import { tasksData } from "@/mock/taskData";
import { employeeData } from "@/mock/employeeData";
import { mockProjects } from "@/mock/projectData";

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
    const project = mockProjects.find((p) => p.id === task.projectId) || null;

    return NextResponse.json({ 
      ...task, 
      creator, 
      assignedEmployees,
      project 
    });
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
    const body = await req.json();

    const taskIndex = tasksData.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Update the mock data
    tasksData[taskIndex] = {
      ...tasksData[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(tasksData[taskIndex]);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const taskIndex = tasksData.findIndex((t) => t.id === id);
        if (taskIndex === -1) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        tasksData.splice(taskIndex, 1);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
