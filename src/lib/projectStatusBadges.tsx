import { Badge } from "@/components/ui/badge";

export const getProjectStatusBadge = (status: string | null) => {
  if (!status) return <Badge variant="outline">-</Badge>;

  const normalizedStatus = status.toLowerCase().replace(/[\s-]+/g, "_");

  switch (normalizedStatus) {
    case "planning":
      return (
        <Badge
          className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200/50"
        >
          Planning
        </Badge>
      );
    case "active":
      return (
        <Badge
          className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-200 border-green-200/50"
        >
          Active
        </Badge>
      );
    case "on_hold":
      return (
        <Badge
          className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200/50"
        >
          On Hold
        </Badge>
      );
    case "completed":
      return (
        <Badge
          className="bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-200 border-purple-200/50"
        >
          Completed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-200 border-red-200/50"
        >
          Cancelled
        </Badge>
      );
    default:
      const displayLabel = status
        .split(/[_-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return <Badge variant="outline">{displayLabel}</Badge>;
  }
};
