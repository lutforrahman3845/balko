import { Department } from "./department";
import { Employee } from "./employee";
import { PaginationMeta } from "./pagination";

export interface Team {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    departmentId: string;    
    teamLeaderId: string;      
    createdAt: string;
    updatedAt: string;
}

export interface ExpandedTeam extends Team {
    department: Department | null;
    teamLeader: Employee | null;
}


export interface GetAllTeamResponse {
    data: ExpandedTeam[];
    meta: PaginationMeta;
}
