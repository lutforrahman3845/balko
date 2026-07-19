"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { ChartTooltip } from "../shared/ChartTooltip";

const data = [
  { month: "Jan", actual: 1.24, plan: 1.2 },
  { month: "Feb", actual: 1.31, plan: 1.28 },
  { month: "Mar", actual: 1.42, plan: 1.36 },
  { month: "Apr", actual: 1.38, plan: 1.44 },
  { month: "May", actual: 1.55, plan: 1.52 },
  { month: "Jun", actual: 1.62, plan: 1.6 },
  { month: "Jul", actual: 1.71, plan: 1.68 },
  { month: "Aug", actual: 1.68, plan: 1.76 },
  { month: "Sep", actual: 1.84, plan: 1.84 },
  { month: "Oct", actual: 1.96, plan: 1.92 },
  { month: "Nov", actual: 2.08, plan: 2.0 },
  { month: "Dec", actual: 2.21, plan: 2.08 },
];

// Axes are chrome, not data: recessive tick labels, no tick marks, and only
// the category axis keeps a baseline.
const axisProps = {
  tick: { fill: "var(--muted-foreground)", fontSize: 12 },
  tickLine: false,
} as const;

/**
 * Two series on one shared unit ($M), so a single axis carries both — a second
 * y-scale would let the lines cross wherever the scales were chosen to make
 * them cross. Plan is dashed as well as differently colored, so the comparison
 * survives grayscale.
 */
export function ExecutiveRevenueTrend() {
  return (
    <DashboardCard
      title="Revenue against plan"
      description="Booked revenue per month, $M"
      icon={TrendingUp}
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "var(--border)" }}
              {...axisProps}
            />
            <YAxis
              {...axisProps}
              axisLine={false}
              tickFormatter={(value: number) => `$${value.toFixed(1)}M`}
              width={72}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={
                <ChartTooltip
                  format={(value) => `$${Number(value).toFixed(2)}M`}
                />
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={32}
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
            />
            <Line
              name="Actual"
              type="monotone"
              dataKey="actual"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
            />
            <Line
              name="Plan"
              type="monotone"
              dataKey="plan"
              stroke="var(--chart-3)"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
