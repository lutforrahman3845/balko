export interface Company {
  id: string;
  logo?: string;
  name: string;
  domain?: string;
  email?: string;
  phone?: string;
  description?: string;
  categoryIds?: string[];
  contactIds?: string[];
  address?: string;
  state?: string;
  city?: string;
  zip?: string;
  country?: string;
  angelList?: string;
  linkedin?: string;
  connectionStrength?: string;
  x?: string;
  instagram?: string;
  facebook?: string;
  telegram?: string;
  createdAt: string;
  updatedAt: string;
  foundedAt?: string;
  estimatedArr?: string;
  employeeRange?: string;
  lastInteractionAt?: string;
  lastContacted?: string;
  teamId?: string;
  badge?: {
    name: string;
    state: string;
  };
}
