import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
    if (!status) return <Badge variant="outline">-</Badge>;
    const normalizedStatus = status.toLowerCase().replace(/[\s-]+/g, "_");
    switch (normalizedStatus) {
        case "leads":
            return (
                <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200/50"
                >
                    Leads
                </Badge>
            );
        case "follow-ups":
            return (
                <Badge
                    variant="secondary"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200/50"
                >
                    Follow-ups
                </Badge>
            );
        case "pipeline":
            return (
                <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200 border-emerald-200/50"
                >
                    Pipeline
                </Badge>
            );
        case "client":
            return (
                <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-200 border-green-200/50"
                >
                    Client
                </Badge>
            );
        default:
            const displayLabel = normalizedStatus
                .split(/[_-]/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            return <Badge variant="outline">{displayLabel}</Badge>;
    }
};

export const ContactStatusOptions = [
    {
        value: 'leads',
        label: 'Leads',
        state: 'bg-blue-500',
    },
    {
        value: 'follow-ups',
        label: 'Follow-ups',
        state: 'bg-amber-500',
    },
    {
        value: 'pipeline',
        label: 'Pipeline',
        state: 'bg-emerald-500',
    },
    {
        value: 'client',
        label: 'Client',
        state: 'bg-green-500',
    },
];