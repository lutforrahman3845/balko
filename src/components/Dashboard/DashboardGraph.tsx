"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const data = [
  { name: "Mon", completed: 12, added: 8 },
  { name: "Tue", completed: 19, added: 12 },
  { name: "Wed", completed: 15, added: 14 },
  { name: "Thu", completed: 22, added: 18 },
  { name: "Fri", completed: 28, added: 20 },
  { name: "Sat", completed: 10, added: 5 },
  { name: "Sun", completed: 7, added: 4 },
];

const DashboardGraph = () => {
  return (
    <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight">Weekly Task Activity</h3>
        <p className="text-sm text-muted-foreground">
          Tasks completed vs added over the last 7 days.
        </p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                color: "hsl(var(--foreground))"
              }}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "14px",
                fontWeight: 500
              }}
            />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
            <Bar
              dataKey="added"
              name="Added"
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardGraph;
