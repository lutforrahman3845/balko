import { Folder } from "@/@types/folder";

export const mockFolderData: Folder[] = [
    {
        "id": "1",
        "parentFolderId": null,
        "name": "Requirements",
        "path": "Requirements",
        "icon": "requirements",
        "createdBy": "user1",
        "createdAt": "2024-01-15T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
    },
    {
        "id": "2",
        "parentFolderId": "1",
        "name": "Functional Specs",
        "path": "Requirements/Functional Specs",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "3",
        "parentFolderId": "1",
        "name": "Non-Functional Specs",
        "path": "Requirements/Non-Functional Specs",
        "icon": "default",
        "createdBy": "user2",
        "createdAt": "2024-01-16T00:00:00Z",
        "updatedAt": "2024-01-16T00:00:00Z"
    },
    {
        "id": "4",
        "parentFolderId": null,
        "name": "Design Assets",
        "path": "Design Assets",
        "icon": "design",
        "createdBy": "user3",
        "createdAt": "2024-01-17T00:00:00Z",
        "updatedAt": "2024-01-17T00:00:00Z"
    },
    {
        "id": "5",
        "parentFolderId": "4",
        "name": "Wireframes",
        "path": "Design Assets/Wireframes",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "6",
        "parentFolderId": "4",
        "name": "Mockups",
        "path": "Design Assets/Mockups",
        "icon": "design",
        "createdBy": "user4",
        "createdAt": "2024-01-18T00:00:00Z",
        "updatedAt": "2024-01-18T00:00:00Z"
    },
    {
        "id": "7",
        "parentFolderId": null,
        "name": "Contracts",
        "path": "Contracts",
        "icon": "contracts",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    },
    {
        "id": "8",
        "parentFolderId": null,
        "name": "Internal Documents",
        "path": "Internal Documents",
        "icon": "organization",
        "createdBy": "user5",
        "createdAt": "2024-01-19T00:00:00Z",
        "updatedAt": "2024-01-19T00:00:00Z"
    }
];
