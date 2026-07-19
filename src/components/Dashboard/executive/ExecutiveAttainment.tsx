"use client";

import { Gauge } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { cn } from "@/lib/utils";

const regions = [
  { region: "North America", attained: 112, revenue: "$7.9M" },
  { region: "EMEA", attained: 96, revenue: "$5.1M" },
  { region: "APAC", attained: 88, revenue: "$3.4M" },
  { region: "LATAM", attained: 71, revenue: "$2.0M" },
];

/**
 * Attainment against a 100% target. A bar is the right form because the value
 * is a magnitude read against a fixed reference; the reference is drawn as a
 * marked line rather than implied, so "did we hit plan" is answerable without
 * reading the axis. One measure, so one color — coloring each region
 * differently would imply an identity the chart does not otherwise use.
 */
export function ExecutiveAttainment() {
  const scaleMax = 125;

  return (
    <DashboardCard
      title="Attainment by region"
      description="Percent of quarterly target"
      icon={Gauge}
    >
      <ul className="flex flex-col gap-5">
        {regions.map((row) => {
          const hitTarget = row.attained >= 100;

          return (
            <li key={row.region} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-medium">{row.region}</span>
                <span className="flex items-baseline gap-2">
                  <span
                    data-numeric
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      hitTarget ? "text-success" : "text-foreground",
                    )}
                  >
                    {row.attained}%
                  </span>
                  <span
                    data-numeric
                    className="text-xs text-muted-foreground tabular-nums"
                  >
                    {row.revenue}
                  </span>
                </span>
              </div>

              <div className="relative h-2.5 w-full rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 start-0 rounded-full"
                  style={{
                    width: `${Math.min((row.attained / scaleMax) * 100, 100)}%`,
                    backgroundColor: hitTarget
                      ? "var(--success)"
                      : "var(--chart-1)",
                  }}
                />
                {/* Target marker at 100% of the scale's reference point */}
                <span
                  aria-hidden
                  className="absolute inset-y-[-3px] w-px bg-foreground/45"
                  style={{ insetInlineStart: `${(100 / scaleMax) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <span aria-hidden className="h-3 w-px bg-foreground/45" />
        Target (100%)
      </p>
    </DashboardCard>
  );
}
