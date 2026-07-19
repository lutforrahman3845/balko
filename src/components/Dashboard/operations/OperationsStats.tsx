"use client";

import { CalendarCheck, FolderKanban, OctagonAlert, Timer } from "lucide-react";
import { StatTile } from "../shared/StatTile";

const stats = [
  {
    label: "On-time delivery",
    value: "91.4%",
    change: "2.8pt",
    direction: "up" as const,
    comparison: "vs last sprint",
    icon: CalendarCheck,
    trend: [84, 86, 85, 88, 89, 90, 91],
  },
  {
    label: "Active projects",
    value: "38",
    change: "4",
    direction: "up" as const,
    comparison: "vs last sprint",
    icon: FolderKanban,
    trend: [29, 30, 32, 33, 34, 36, 38],
  },
  {
    label: "Median cycle time",
    value: "4.2d",
    change: "0.6d",
    direction: "down" as const,
    // Faster delivery is better, so a falling cycle time is a good outcome.
    higherIsBetter: false,
    comparison: "vs last sprint",
    icon: Timer,
    trend: [6.1, 5.8, 5.4, 5.2, 4.9, 4.6, 4.2],
  },
  {
    label: "Blocked tasks",
    value: "17",
    change: "5",
    direction: "up" as const,
    higherIsBetter: false,
    comparison: "vs last sprint",
    icon: OctagonAlert,
    trend: [8, 9, 11, 12, 13, 15, 17],
  },
];

export function OperationsStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </div>
  );
}
