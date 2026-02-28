export interface Employee {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: string | null;
    designation: string;
    departmentId: string;
    teamId: string | null;
    roleId: string;
    avatar: string | null;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}