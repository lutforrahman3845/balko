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
    const assignedContacts =
      task.assignedContactIds
        ?.map((id) => employeeData.find((c) => c.id === id))
        .filter(Boolean) || [];
    return NextResponse.json({ ...task, creator, assignedContacts });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
