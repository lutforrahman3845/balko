"use client";

import { Filter } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";

const stages = [
  { stage: "Leads", count: 4820, value: "$24.1M" },
  { stage: "Qualified", count: 2140, value: "$16.8M" },
  { stage: "Proposal", count: 968, value: "$9.4M" },
  { stage: "Negotiation", count: 412, value: "$5.2M" },
  { stage: "Closed won", count: 187, value: "$2.8M" },
];

// Pipeline stages are ordered, so the ramp is sequential — one hue getting
// darker along the funnel — rather than five categorical hues, which would
// imply the stages are unrelated peers.
const fill = (index: number, total: number) =>
  `color-mix(in oklch, var(--chart-1) ${30 + (index / (total - 1)) * 70}%, var(--card))`;

export function ExecutiveFunnel() {
  const max = stages[0].count;

  return (
    <DashboardCard
      title="Pipeline funnel"
      description="Open opportunities by stage"
      icon={Filter}
    >
      <ul className="flex flex-col gap-3">
        {stages.map((row, index) => {
          const previous = stages[index - 1];
          const conversion = previous
            ? Math.round((row.count / previous.count) * 100)
            : null;

          return (
            <li key={row.stage} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate font-medium">{row.stage}</span>
                <span className="flex items-baseline gap-2">
                  <span data-numeric className="font-semibold tabular-nums">
                    {row.count.toLocaleString()}
                  </span>
                  <span
                    data-numeric
                    className="text-xs text-muted-foreground tabular-nums"
                  >
                    {row.value}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="h-7 rounded-md"
                  style={{
                    width: `${(row.count / max) * 100}%`,
                    backgroundColor: fill(index, stages.length),
                  }}
                />
                {conversion !== null && (
                  <span
                    data-numeric
                    className="shrink-0 text-xs text-muted-foreground tabular-nums"
                  >
                    {conversion}% carried
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </DashboardCard>
  );
}
