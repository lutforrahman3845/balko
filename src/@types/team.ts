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