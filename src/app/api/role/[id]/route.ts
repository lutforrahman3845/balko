import { NextRequest, NextResponse } from "next/server";
import { rolesData } from "@/mock/roleData";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const role = rolesData.find((r) => r.id === id);

    if (!role) {
        return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(role);
}
