"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { ChartTooltip } from "../shared/ChartTooltip";

const data = [
  { week: "W1", created: 82, completed: 71 },
  { week: "W2", created: 74, completed: 78 },
  { week: "W3", created: 91, completed: 80 },
  { week: "W4", created: 88, completed: 94 },
  { week: "W5", created: 96, completed: 89 },
  { week: "W6", created: 79, completed: 92 },
  { week: "W7", created: 85, completed: 97 },
  { week: "W8", created: 93, completed: 101 },
];

/**
 * Created against completed, both counts of tasks, so one axis serves both.
 * Overlaid rather than stacked: the question is which line is above the other
 * (is the backlog growing?), and stacking would hide exactly that.
 */
export function OperationsThroughput() {
  return (
    <DashboardCard
      title="Task throughput"
      description="Tasks created and completed per week"
      icon={Activity}
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
            <defs>
              {/* Only the completed series is filled. Two overlapping washes
                  muddied the region where the lines cross — which is exactly
                  the region this chart exists to show. */}
              <linearGradient id="ops-completed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={56}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={<ChartTooltip format={(value) => `${value} tasks`} />}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={32}
              iconType="plainline"
              wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
            />
            <Area
              name="Created"
              type="monotone"
              dataKey="created"
              stroke="var(--chart-3)"
              strokeWidth={2}
              strokeDasharray="5 4"
              fill="none"
              activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
            />
            <Area
              name="Completed"
              type="monotone"
              dataKey="completed"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#ops-completed)"
              activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
