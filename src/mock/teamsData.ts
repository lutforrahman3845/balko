import { Team } from "@/@types/team";

export const teamData: Team[] = [
  {
    id: '1',
    name: 'executive_team',
    displayName: 'Executive Team',
    description: 'Core leadership team including CEO and COO.',
    departmentId: '1', // Executive Management
    teamLeaderId: '1',  // Assign CEO
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },

  {
    id: '2',
    name: 'frontend_team',
    displayName: 'Frontend Team',
    description: 'Handles web frontend development.',
    departmentId: '2', // Engineering
    teamLeaderId: '6',  // Assign Senior Developer
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '3',
    name: 'backend_team',
    displayName: 'Backend Team',
    description: 'Handles server-side development and APIs.',
    departmentId: '2', // Engineering
    teamLeaderId: '6',  
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '4',
    name: 'app_team',
    displayName: 'App Team',
    description: 'Handles app development.',
    departmentId: '2',
    teamLeaderId: '43',
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '5',
    name: 'ui_ux_team',
    displayName: 'UI/UX Team',
    description: 'Handles all user interface and experience design.',
    departmentId: '3', // Design
    teamLeaderId: '47',
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '6',
    name: 'qa_team',
    displayName: 'QA Team',
    description: 'Responsible for quality assurance and testing.',
    departmentId: '4', // QA
    teamLeaderId: '15', // Assign QA Lead
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  },
  {
    id: '9',
    name: 'marketing_team',
    displayName: 'Marketing Team',
    description: 'Handles marketing, branding, and campaigns.',
    departmentId: '7', // Marketing
    teamLeaderId: '24', 
    createdAt: '2025-02-05T21:02:53.000Z',
    updatedAt: '2025-02-05T21:02:53.000Z',
  }
];