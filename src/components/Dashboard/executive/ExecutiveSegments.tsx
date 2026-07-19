"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Building2 } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { ChartTooltip } from "../shared/ChartTooltip";

const data = [
  { segment: "Enterprise", revenue: 8.9 },
  { segment: "Mid-market", revenue: 5.4 },
  { segment: "SMB", revenue: 3.1 },
  { segment: "Public sector", revenue: 1.02 },
];

/**
 * One measure across four categories, so every bar is the same color — the
 * segment names already carry identity, and recoloring per bar would encode
 * nothing while spending four palette slots.
 */
export function ExecutiveSegments() {
  return (
    <DashboardCard
      title="Revenue by segment"
      description="Trailing twelve months, $M"
      icon={Building2}
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="segment"
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={64}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(value: number) => `$${value}M`}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.5 }}
              content={
                <ChartTooltip
                  format={(value) => `$${Number(value).toFixed(2)}M`}
                />
              }
            />
            <Bar name="Revenue" dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={72}>
              {data.map((entry) => (
                <Cell key={entry.segment} fill="var(--chart-1)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
