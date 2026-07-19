"use client";

import { CircleDollarSign, Repeat, Target, Trophy } from "lucide-react";
import { StatTile } from "../shared/StatTile";

const stats = [
  {
    label: "Annual recurring revenue",
    value: "$18.42M",
    change: "9.4%",
    direction: "up" as const,
    comparison: "vs last quarter",
    icon: CircleDollarSign,
    trend: [12.1, 13.4, 13.2, 14.8, 15.9, 17.2, 18.4],
  },
  {
    label: "Net revenue retention",
    value: "112%",
    change: "3.1pt",
    direction: "up" as const,
    comparison: "vs last quarter",
    icon: Repeat,
    trend: [104, 106, 105, 108, 109, 111, 112],
  },
  {
    label: "Pipeline coverage",
    value: "3.4×",
    change: "0.3×",
    direction: "down" as const,
    comparison: "vs last quarter",
    icon: Target,
    trend: [4.1, 4.0, 3.9, 3.7, 3.6, 3.5, 3.4],
  },
  {
    label: "Win rate",
    value: "27.8%",
    change: "1.6pt",
    direction: "up" as const,
    comparison: "vs last quarter",
    icon: Trophy,
    trend: [23.4, 24.1, 25.0, 25.2, 26.4, 27.1, 27.8],
  },
];

export function ExecutiveStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </div>
  );
}
