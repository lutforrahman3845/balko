import { NextRequest, NextResponse } from "next/server";
import { teamData } from "@/mock/teamsData";
import { teamMemberData } from "@/mock/teamMemberData";
import { departmentData } from "@/mock/departmentData";
import { employeeData } from "@/mock/employeeData";
import { rolesData } from "@/mock/roleData";

export async function GET(
    request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const team = await teamData.find((team) => team.id === id)
        if (!team) {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }
        const department = departmentData.find((dept) => dept.id === team.departmentId);
        const leaderBase = employeeData.find((emp) => emp.id === team.teamLeaderId);
        const teamLeader = leaderBase ? {
            ...leaderBase,
            department: departmentData.find((dept) => dept.id === leaderBase.departmentId),
            role: rolesData.find((role) => role.id === leaderBase.roleId)
        } : null;
        const teamMembers = teamMemberData.filter((teamMember) => teamMember.teamId === team.id).map((teamMember) => {
            const memberBase = employeeData.find((emp) => emp.id === teamMember.userId);
            return memberBase ? {
                ...memberBase,
                department: departmentData.find((dept) => dept.id === memberBase.departmentId),
                role: rolesData.find((role) => role.id === memberBase.roleId)
            } : null;
        }).filter((member) => member !== null);

        return NextResponse.json({ data: { ...team, department, teamLeader, teamMembers } });
    } catch (error) {
        console.error("Error fetching team:", error);
        return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
    }
}