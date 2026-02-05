import { INotification } from '../@types/notification';

export const notificationData: INotification[] = [
    // 1. Task & Workflow Updates
    {
        id: '1',
        type: 'assignment',
        sender: {
            name: 'Sarah Chen',
            avatar: '/avatars/300-34.png',
            role: 'Product Manager',
        },
        title: 'Sarah Chen assigned you to task',
        isUnread: true,
        payload: {
            task: {
                title: 'Design System Documentation',
                dueDate: 'Tomorrow',
            },
        },
        createdAt: '2026-02-05T21:02:53.000Z',
        updatedAt: '2026-02-05T21:02:53.000Z',
    },
    {
        id: '2',
        type: 'status-change',
        sender: {
            name: 'Mike Ross',
            avatar: '/avatars/300-2.png',
            role: 'Developer',
        },
        title: 'Mike Ross moved task',
        isUnread: true,
        payload: {
            task: {
                title: 'Auth Integration',
            },
            statusChange: {
                from: 'In Progress',
                to: 'Done',
            },
        },
        createdAt: '2026-02-05T19:02:53.000Z',
        updatedAt: '2026-02-05T19:02:53.000Z',
    },
    {
        id: '3',
        type: 'dependency',
        sender: {
            name: 'System',
            avatar: null,
            role: 'Bot',
        },
        title: 'Task dependency unblocked',
        isUnread: false,
        payload: {
            task: {
                title: 'Frontend Implementation',
            },
        },
        createdAt: '2026-02-05T18:02:53.000Z',
        updatedAt: '2026-02-05T18:02:53.000Z',
    },
    {
        id: '4',
        type: 'approval',
        sender: {
            name: 'Jessica Pearson',
            avatar: '/avatars/300-13.png',
            role: 'Art Director',
        },
        title: 'Jessica Pearson requested review',
        isUnread: true,
        payload: {
            task: {
                title: 'Homepage Hero Section',
            },
        },
        createdAt: '2026-02-04T23:02:53.000Z',
        updatedAt: '2026-02-04T23:02:53.000Z',
    },

    // 2. Time-Sensitive Alerts
    {
        id: '5',
        type: 'due-date',
        sender: {
            name: 'System',
            avatar: null,
        },
        title: 'Upcoming Due Date',
        isUnread: true,
        payload: {
            task: {
                title: 'Q3 Financial Report',
                dueDate: 'Tomorrow at 5:00 PM',
            },
        },
        createdAt: '2026-02-05T22:52:53.000Z',
        updatedAt: '2026-02-05T22:52:53.000Z',
    },
    {
        id: '6',
        type: 'overdue',
        sender: { name: 'System', avatar: null },
        title: 'Task Overdue',
        isUnread: true,
        payload: {
            task: {
                title: 'Client Feedback Implementation',
                dueDate: 'Yesterday',
            },
        },
        createdAt: '2026-02-04T23:02:53.000Z',
        updatedAt: '2026-02-04T23:02:53.000Z',
    },
    {
        id: '7',
        type: 'milestone',
        sender: { name: 'System', avatar: null },
        title: 'Sprint #24 Ending',
        isUnread: false,
        payload: {
            milestone: {
                name: 'Sprint #24',
                deadline: '48 hours'
            }
        },
        createdAt: '2026-02-05T22:32:53.000Z',
        updatedAt: '2026-02-05T22:32:53.000Z',
    },

    // 3. Collaboration & Communication
    {
        id: '8',
        type: 'mention',
        sender: {
            name: 'Alex Johnson',
            avatar: '/avatars/300-1.png',
            role: 'QA Lead',
        },
        title: 'Alex Johnson mentioned you',
        isUnread: true,
        payload: {
            comment: '@Lutfor can you check this regression issue?',
            task: {
                title: 'Login Page Validation',
            },
        },
        createdAt: '2026-02-05T22:47:53.000Z',
        updatedAt: '2026-02-05T22:47:53.000Z',
    },
    {
        id: '9',
        type: 'comment',
        sender: {
            name: 'Emily Davis',
            avatar: '/avatars/300-2.png',
            role: 'Designer',
        },
        title: 'New comment on task',
        isUnread: false,
        payload: {
            comment: 'I updated the color palette in the Figma file.',
            task: {
                title: 'Theme Settings',
            },
        },
        createdAt: '2026-02-05T22:02:53.000Z',
        updatedAt: '2026-02-05T22:02:53.000Z',
    },
    {
        id: '10',
        type: 'file',
        sender: {
            name: 'David Wilson',
            avatar: '/avatars/300-3.png',
            role: 'Stakeholder',
        },
        title: 'David Wilson uploaded an attachment',
        isUnread: false,
        payload: {
            file: {
                name: 'Project_Brief_v2.pdf',
                extension: 'pdf',
                url:""
            },
            task: {
                title: 'Project Kickoff',
            },
        },
        createdAt: '2026-02-03T23:02:53.000Z',
        updatedAt: '2026-02-03T23:02:53.000Z',
    },
];
