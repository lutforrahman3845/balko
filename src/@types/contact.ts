import { Company } from "./company";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string | null;
  position: string;
  companyId: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
  country: string | null;
  status: string;
  note: string | null;
  socialLinks: {
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
  lastContacted: string;
}

export interface ExpandedContact extends Contact {
  company: Company | null;
}

export interface GetContacts {
  data: ExpandedContact[];
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Follow ups Form Schema
import { z } from "zod";

export const ContactsFollowUpFormSchema = z.object({
  status: z.string().min(1, "Status is required"),
  lastContacted: z.string().min(1, "Last contacted is required"),
  note: z.string().min(1, "Note or last contacted recap is required"),
});

export type ContactsFollowUpFormValues = z.infer<
  typeof ContactsFollowUpFormSchema
>;

// Conatct create Form Schema
export const ContactsCreateFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    avatar: z
      .union([z.instanceof(File), z.string()])
      .optional()
      .nullable(),
    email: z.string().email("Email is invalid"),
    phone: z
      .string()
      .regex(/^[0-9+\- ]*$/, "Invalid phone number format")
      .optional(),
    position: z.string().min(1, "Position is required"),
    company: z
      .object({
        id: z.string().optional(),
        logo: z
          .union([z.instanceof(File), z.string()])
          .optional()
          .nullable(),
        name: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    status: z.string().min(1, "Status is required"),
    socialLinks: z.record(z.string(), z.string().url("Invalid URL")),
    note: z.string().optional(),
  })
  .refine((data) => Object.keys(data.socialLinks).length > 0, {
    message: "At least one social link is required",
    path: ["socialLinks"],
  });

export type ContactsCreateFormValues = z.infer<typeof ContactsCreateFormSchema>;
