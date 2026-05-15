import { NextResponse } from "next/server";
import { mockProjects } from "@/mock/projectData";
import { employeeData } from "@/mock/employeeData";
import { teamData } from "@/mock/teamsData";
import { departmentData } from "@/mock/departmentData";
import { COMPANIES } from "@/mock/companies";
import { mockContacts } from "@/mock/contacts";
import { teamMemberData } from "@/mock/teamMemberData";
import { rolesData } from "@/mock/roleData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("searchQuery")?.toLowerCase() || "";
    const typeParam = searchParams.get("type");
    const statusParam = searchParams.get("status");
    const priorityParam = searchParams.get("priority");
    
    const pageIndex = parseInt(searchParams.get("pageIndex") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    let filtered = [...mockProjects];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery) ||
          project.description.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by Type
    if (typeParam) {
      const types = typeParam.split(",");
      filtered = filtered.filter((project) => types.includes(project.type));
    }

    // Filter by Status
    if (statusParam) {
      const statuses = statusParam.split(",");
      filtered = filtered.filter((project) => statuses.includes(project.status));
    }

    // Filter by Priority
    if (priorityParam) {
      const priorities = priorityParam.split(",");
      filtered = filtered.filter((project) => priorities.includes(project.priority));
    }

    // Sort by newest
    filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

    // Expand related data
    const expandedProjects = paginated.map((project) => {
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

      return {
        ...project,
        manager,
        teams,
        department,
        company,
        contactPerson,
      };
    });

    return NextResponse.json({
      data: expandedProjects,
      meta: {
        pageIndex,
        pageSize,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newProject = {
            ...body,
            id: (mockProjects.length + 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        mockProjects.push(newProject);
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
