export interface Department {
    id: string;
    name: string;
    displayName: string;
    description: string | null;
    parentDepartmentId?: string | null; 
    departmentHeadId?: string | null; 
    createdAt: string;
    updatedAt: string;
}