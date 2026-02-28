export type Role = {
    id: string;
    name: string;
    description: string | null;
    permissions: string[];
}