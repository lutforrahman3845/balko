export interface Task {
  id: string;
  title: string;
  content: string;
  companyIds?: string[];
  contactIds?: string[];
  dealIds?: string[];
  createdBy: string;
  dueAt: string;
  completedAt?: string;
  completedBy?: string;
  assignedContactIds?: string[];
  status?: 'pending' | 'completed' | 'in_progress' | 'blocked';
  priority?: 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
}
