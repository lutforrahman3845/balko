import { NextRequest, NextResponse } from "next/server";
import { GetAllTeamResponse } from "@/@types/team";
import { teamData } from "@/mock/teamsData";
import { departmentData } from "@/mock/departmentData";
import { employeeData } from "@/mock/employeeData";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get('searchQuery') || '';
    const departmentsParam = searchParams.get('departmentId') || '';


    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const departmentIds = departmentsParam ? departmentsParam.split(",").filter(Boolean) : [];
    let filteredTeams = [...teamData];
    // Department Filter
    if (departmentIds.length > 0) {
        filteredTeams = filteredTeams.filter((team) => team.departmentId && departmentIds.includes(team.departmentId));
    }
    // Search Filter
    if (searchQuery) {
        filteredTeams = filteredTeams.filter(team =>
            team.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const total = filteredTeams.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    const paginatedTeams = filteredTeams.slice(start, end);
    const expandedTeams = paginatedTeams.map(team => {
        return {
            ...team,
            department: departmentData.find(department => department.id === team.departmentId) || null,
            teamLeader: employeeData.find(employee => employee.id === team.teamLeaderId) || null
        }
    })
    const response: GetAllTeamResponse = {
        data: expandedTeams,
        meta: {
            pageIndex,
            pageSize,
            total,
            totalPages,
        },
    };

    return NextResponse.json(response);
}
