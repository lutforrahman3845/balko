import { Team } from "@/@types/team";

export const teamData: Team[] = [
  {
    id: '1',
    name: 'executive_team',
    displayName: 'Executive Team',
    description: 'Core leadership team including CEO and COO.',
    departmentId: '1', // Executive Management
    teamLeaderId: '',  // Assign CEO
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },

  {
    id: '2',
    name: 'frontend_team',
    displayName: 'Frontend Team',
    description: 'Handles web frontend development.',
    departmentId: '2', // Engineering
    teamLeaderId: '',  // Assign Senior Developer
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '3',
    name: 'backend_team',
    displayName: 'Backend Team',
    description: 'Handles server-side development and APIs.',
    departmentId: '2', // Engineering
    teamLeaderId: '',  
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '4',
    name: 'mobile_team',
    displayName: 'Mobile Team',
    description: 'Handles mobile app development.',
    departmentId: '2',
    teamLeaderId: '',
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '5',
    name: 'ui_ux_team',
    displayName: 'UI/UX Team',
    description: 'Handles all user interface and experience design.',
    departmentId: '3', // Design
    teamLeaderId: '',
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '6',
    name: 'qa_team',
    displayName: 'QA Team',
    description: 'Responsible for quality assurance and testing.',
    departmentId: '4', // QA
    teamLeaderId: '', // Assign QA Lead
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '7',
    name: 'product_team',
    displayName: 'Product Team',
    description: 'Manages product backlog and roadmap.',
    departmentId: '5', // Product Management
    teamLeaderId: '',
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '8',
    name: 'hr_team',
    displayName: 'HR Team',
    description: 'Manages recruitment, employee relations, and HR operations.',
    departmentId: '6', // HR
    teamLeaderId: '', 
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '9',
    name: 'marketing_team',
    displayName: 'Marketing Team',
    description: 'Handles marketing, branding, and campaigns.',
    departmentId: '7', // Marketing
    teamLeaderId: '', 
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  }
];