import { Company } from "./company";

export interface Contact {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  companyId: string | null;
  address: string;
  state: string;
  city: string;
  zip: string;
  country: string;
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