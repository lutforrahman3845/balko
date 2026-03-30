export interface Deal {
  id: string;
  title: string;
  content: string;
  companyIds?: string[];
  contactIds?: string[];
  dealIds?: string[];
  userName: string;
  dueAt: string;
  completedAt?: string;
  completedBy?: string;
  assignedContactIds?: string[];
  status?: 'pending' | 'completed' | 'in_progress' | 'In progress';
  priority?: 'high' | 'medium' | 'low';
  comments?: number;
  amount?: number;
  currency?: 'USD' | 'EUR' | 'RUB';
  paymentDate?: string;
  paymentType?: 'cash' | 'bank_transfer' | 'invoice';
  contractNumber?: string;
  discount?: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
