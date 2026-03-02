export interface Employee {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: string | null;
    designation?: string | null;
    employeeType: 'full_time' | 'part_time' | 'contractor' | 'intern';
    departmentId: string;
    avatar: string | null;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
    
}