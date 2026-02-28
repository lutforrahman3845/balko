export interface Team {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    teamMembersIds: string[];
    teamLeaderId: string;
    projectManagerId: string;
    createdAt: string;
    updatedAt: string;
}