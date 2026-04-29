import { Badge } from "@/components/ui/badge";

export const getConnectionStrengthBadge = (strength: string | null) => {
  if (!strength) return <Badge variant="outline">-</Badge>;

  const normalizedStrength = strength.toLowerCase().replace(/[\s-]+/g, "_");

  switch (normalizedStrength) {
    case "weak":
      return (
        <Badge
          className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-200 border-red-200/50"
        >
          Weak
        </Badge>
      );
    case "medium":
      return (
        <Badge
          className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200 border-amber-200/50"
        >
          Medium
        </Badge>
      );
    case "strong":
      return (
        <Badge
          className="bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-200 border-green-200/50"
        >
          Strong
        </Badge>
      );
    case "very_strong":
      return (
        <Badge
          className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200/50"
        >
          Very Strong
        </Badge>
      );
    case "extremely_strong":
      return (
        <Badge
          className="bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-200 border-purple-200/50"
        >
          Extremely Strong
        </Badge>
      );
    default:
      const displayLabel = strength
        .split(/[_-]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return <Badge variant="outline">{displayLabel}</Badge>;
  }
};

export const ConnectionStrengthOptions = [
  {
    value: "weak",
    label: "Weak",
    state: "bg-red-500",
  },
  {
    value: "medium",
    label: "Medium",
    state: "bg-amber-500",
  },
  {
    value: "strong",
    label: "Strong",
    state: "bg-emerald-500",
  },
  {
    value: "very_strong",
    label: "Very Strong",
    state: "bg-blue-500",
  },
  {
    value: "extremely_strong",
    label: "Extremely Strong",
    state: "bg-purple-500",
  },
];