import { z } from "zod";

export interface CompanyCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCompanyCategoryResponse {
  data: CompanyCategory[];
  meta: {
    pageIndex: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const CompanyCategoryFormSchema = z.object({
  name: z.string().min(1, "Company Category Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
});

export type CompanyCategoryFormValues = z.infer<typeof CompanyCategoryFormSchema>;
