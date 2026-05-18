import { NextResponse } from "next/server";
import { mockProjects } from "@/mock/projectData";
import { employeeData } from "@/mock/employeeData";
import { teamData } from "@/mock/teamsData";
import { departmentData } from "@/mock/departmentData";
import { mockContacts } from "@/mock/contacts";
import { COMPANIES } from "@/mock/companies";
import { teamMemberData } from "@/mock/teamMemberData";
import { rolesData } from "@/mock/roleData";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const manager = employeeData.find((emp) => emp.id === project.managerId);
  
  // Expand each team to ExpandedSingleTeam
  const teams = project.teamIds.map((tId) => {
    const team = teamData.find((t) => t.id === tId);
    if (!team) return null;

    const teamDept = departmentData.find((dept) => dept.id === team.departmentId);
    const leaderBase = employeeData.find((emp) => emp.id === team.teamLeaderId);
    const teamLeader = leaderBase ? {
        ...leaderBase,
        department: departmentData.find((dept) => dept.id === leaderBase.departmentId),
        role: rolesData.find((role) => role.id === leaderBase.roleId)
    } : null;

    const teamMembers = teamMemberData.filter((tm) => tm.teamId === team.id).map((tm) => {
        const memberBase = employeeData.find((emp) => emp.id === tm.userId);
        return memberBase ? {
            ...memberBase,
            department: departmentData.find((dept) => dept.id === memberBase.departmentId),
            role: rolesData.find((role) => role.id === memberBase.roleId)
        } : null;
    }).filter(Boolean);

    return {
        ...team,
        department: teamDept,
        teamLeader,
        teamMembers
    };
  }).filter(Boolean);

  const department = departmentData.find((d) => d.id === project.departmentId) || null;
  const company = COMPANIES.find((c) => c.id === project.companyId) || null;
  const contactPerson = mockContacts.find((c) => c.id === project.contactPersonId) || null;

  const expandedProject = {
    ...project,
    manager,
    teams,
    department,
    company,
    contactPerson,
  };

  return NextResponse.json(expandedProject);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const index = mockProjects.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    mockProjects[index] = {
      ...mockProjects[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockProjects[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = mockProjects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  mockProjects.splice(index, 1);
  return NextResponse.json({ success: true });
}
