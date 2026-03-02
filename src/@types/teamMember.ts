export interface TeamMember {
    id: string;
    userId: string;    
    teamId: string;    
    roleId: string;    
    joinedAt: string;
    leftAt?: string | null;
}