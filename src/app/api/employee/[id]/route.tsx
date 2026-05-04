import { NextRequest, NextResponse } from "next/server";
import { employeeData } from "@/mock/employeeData";
import { departmentData } from "@/mock/departmentData";
import { rolesData } from "@/mock/roleData";
import { teamData } from "@/mock/teamsData";
import { teamMemberData } from "@/mock/teamMemberData";
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const employee = employeeData.find((emp) => emp.id.toString() === id);
        if (!employee) {
            return NextResponse.json(
                { error: { message: "Employee not found" } },
                { status: 404 }
            );
        }
        const employeeDepartment = departmentData.find((dept) => dept.id === employee.departmentId);
        const employeeRole = rolesData.find((role) => role.id === employee.roleId);
        // Find teams
        const userTeams = teamMemberData
            .filter(tm => tm.userId === employee.id)
            .map(tm => {
                const team = teamData.find(t => t.id === tm.teamId);
                return {
                    id: team?.id,
                    name: team?.name,
                    displayName: team?.displayName,
                    description: team?.description,
                    joinedAt: tm.joinedAt,
                    teamMemberId: tm.id,
                    teamLeader: employeeData.find(e => e.id === team?.teamLeaderId),
                    createdAt: team?.createdAt,
                    updatedAt: team?.updatedAt,
                    roleInTeam: rolesData.find(r => r.id === tm.roleId)
                };
            });
        return NextResponse.json({
            data: {
                ...employee,
                department: employeeDepartment,
                role: employeeRole,
                teams: userTeams
            }
        });

    } catch (error) {
        console.error("Error fetching employee:", error);
        return NextResponse.json(
            { error: { message: "Internal Server Error" } },
            { status: 500 }
        );
    }
}