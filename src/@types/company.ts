import { Category } from "./category";
import { Contact } from "./contact";

export interface Company {
  id: string;
  logo: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  description: string | null;
  categoryIds: string[] | null;
  contactIds: string[] | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
  country: string | null;
  website: string ;
  socialLinks: {
    [key: string]: string;
  };
  connectionStrength: string | null;
  note: string | null;
  estimatedArr: string | null;
  employeeRange: string | null;
  createdAt: string;
  updatedAt: string;
  lastInteractionAt: string | null;
}

export interface ExpandedCompany extends Company {
  categories: Category[];
  contacts: Contact[];
}
export interface GetCompaniesResponse {
  data: ExpandedCompany[];
  total: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}

import { z } from "zod";

// Company Form Schema
export const CompanyFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 50 characters"),
    logo: z
      .union([z.instanceof(File), z.string()])
      .optional()
      .nullable(),
    email: z.string().email("Email is invalid"),
    phone: z
      .string()
      .regex(/^[0-9+\- ]*$/, "Invalid phone number format")
      .optional(),
    website: z.string().url("Website must be a valid URL").optional().or(z.literal("")),
    description: z.string().optional(),
    categoryIds: z.array(z.string()).optional(),
    address: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    connectionStrength: z.enum(["weak", "medium", "strong", "very_strong", "extremely_strong"]).optional(),
    estimatedArr: z.string().optional(),
    employeeRange: z.string().optional(),
    socialLinks: z.record(z.string(), z.string().url("Invalid URL")),
  })
  .refine((data) => Object.keys(data.socialLinks).length > 0, {
    message: "At least one social link is required",
    path: ["socialLinks"],
  });

export type CompanyCreateFormValues = z.infer<typeof CompanyFormSchema>;