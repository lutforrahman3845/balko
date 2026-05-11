import { z } from "zod";

export interface CompanyType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCompanyTypeResponse {
  data: CompanyType[];
  meta: {
    pageIndex: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const CompanyTypeFormSchema = z.object({
  name: z.string().min(1, "Company Type Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
});

export type CompanyTypeFormValues = z.infer<typeof CompanyTypeFormSchema>;
