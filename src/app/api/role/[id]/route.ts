import { NextRequest, NextResponse } from "next/server";
import { rolesData } from "@/mock/roleData";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const role = rolesData.find((r) => r.id === id);

    if (!role) {
        return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(role);
}
