import { Folder } from "@/@types/folder";

export const mockFolderData: Folder[] = [
    {
        "id": "1",
        "projectId": "1",
        "parentFolderId": null,
        "name": "Requirements",
        "path": "Requirements",
        "color": "#3B82F6",
        "icon": "requirement",
        "createdBy": "user1",
        "createdAt": "2024-01-15T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
    },
    {
        "id": "2",
        "projectId": "1",
        "parentFolderId": "1",
        "name": "Functional Specs",
        "path": "Requirements/Functional Specs",
        "color": "#10B981",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "3",
        "projectId": "1",
        "parentFolderId": "1",
        "name": "Non-Functional Specs",
        "path": "Requirements/Non-Functional Specs",
        "color": "#F59E0B",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "4",
        "projectId": "2",
        "parentFolderId": null,
        "name": "Design Assets",
        "path": "Design Assets",
        "color": "#EC4899",
        "icon": "design",
        "createdBy": "user3",
        "createdAt": "2024-01-17T00:00:00Z",
        "updatedAt": "2024-01-17T00:00:00Z"
    },
    {
        "id": "5",
        "projectId": "2",
        "parentFolderId": "4",
        "name": "Wireframes",
        "path": "Design Assets/Wireframes",
        "color": "#8B5CF6",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "6",
        "projectId": "2",
        "parentFolderId": "4",
        "name": "Mockups",
        "path": "Design Assets/Mockups",
        "color": "#06B6D4",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "7",
        "projectId": "3",
        "parentFolderId": null,
        "name": "Contracts",
        "path": "Contracts",
        "color": "#10B981",
        "icon": "contract",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    },
    {
        "id": "8",
        "projectId": null,
        "parentFolderId": null,
        "name": "Internal Documents",
        "path": "Internal Documents",
        "color": "#F59E0B",
        "icon": "organization",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    }
];
