export interface Company {
  id: string;
  logo: string | null;
  name: string;
  domain: string | null;
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
