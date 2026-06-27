import { Folder } from "@/@types/folder";

export const mockFolderData: Folder[] = [
    {
        "id": "1",
        "parentFolderId": null,
        "name": "Requirements",
        "icon": "requirements",
        "createdBy": "user1",
        "createdAt": "2024-01-15T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
    },
    {
        "id": "2",
        "parentFolderId": "1",
        "name": "Functional Specs",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "3",
        "parentFolderId": "1",
        "name": "Non-Functional Specs",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "4",
        "parentFolderId": null,
        "name": "Design Assets",
        "icon": "design",
        "createdBy": "user3",
        "createdAt": "2024-01-17T00:00:00Z",
        "updatedAt": "2024-01-17T00:00:00Z"
    },
    {
        "id": "5",
        "parentFolderId": "4",
        "name": "Wireframes",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "6",
        "parentFolderId": "4",
        "name": "Mockups",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "7",
        "parentFolderId": null,
        "name": "Contracts",
        "icon": "contracts",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    },
    {
        "id": "8",
        "parentFolderId": null,
        "name": "Internal Documents",
        "icon": "organization",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    }
];
