import { Department } from "./department";

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
    roleId:string
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
    
}

export  interface ExpandedEmployee extends Employee {
   department: Department;
}

export interface GetEmployee {
    data: ExpandedEmployee[];
    total: number;
    totalPages: number;
    pageIndex: number;
    pageSize: number;
}