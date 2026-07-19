"use client";

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Tokens are oklch, not HSL triplets — reference the vars directly (inline
// styles resolve CSS vars) so the tooltip stays theme-aware in light and dark.
const TOOLTIP_STYLE = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  borderRadius: "8px",
  color: "var(--foreground)",
  fontSize: "13px",
};

// Recharts renders axis ticks/grid as SVG attributes where var() does NOT
// resolve — use a mid-gray that reads in both themes (matches the dashboard).
const AXIS = "#888888";

const revenueData = [
  { name: "Jan", revenue: 42, target: 40 },
  { name: "Feb", revenue: 55, target: 45 },
  { name: "Mar", revenue: 48, target: 50 },
  { name: "Apr", revenue: 61, target: 55 },
  { name: "May", revenue: 72, target: 60 },
  { name: "Jun", revenue: 68, target: 65 },
  { name: "Jul", revenue: 84, target: 70 },
  { name: "Aug", revenue: 91, target: 75 },
];

const sessionsData = [
  { name: "Mon", sessions: 1200 },
  { name: "Tue", sessions: 1800 },
  { name: "Wed", sessions: 1500 },
  { name: "Thu", sessions: 2100 },
  { name: "Fri", sessions: 2600 },
  { name: "Sat", sessions: 1900 },
  { name: "Sun", sessions: 1400 },
];

const trafficData = [
  { name: "Organic", value: 42, color: "#3b82f6" },
  { name: "Direct", value: 26, color: "#10b981" },
  { name: "Referral", value: 18, color: "#f59e0b" },
  { name: "Social", value: 14, color: "#8b5cf6" },
];

const productsData = [
  { name: "Pro Plan", sales: 320 },
  { name: "Team Plan", sales: 260 },
  { name: "Starter", sales: 180 },
  { name: "Add-ons", sales: 120 },
  { name: "Enterprise", sales: 90 },
];

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-5 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col ${className ?? ""}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex-1 w-full min-h-0">{children}</div>
    </div>
  );
}

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ChartCard
        title="Revenue vs Target"
        subtitle="Monthly revenue ($k) against target"
        className="lg:col-span-2 h-90"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={AXIS} strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#rev)" />
            <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Traffic Sources" subtitle="Share of sessions" className="h-90">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trafficData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {trafficData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Weekly Sessions" subtitle="Visitor sessions this week" className="lg:col-span-2 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sessionsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={AXIS} strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Top Products" subtitle="Sales by product" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productsData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={AXIS} strokeOpacity={0.2} />
            <XAxis type="number" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" stroke={AXIS} fontSize={12} tickLine={false} axisLine={false} width={70} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: AXIS, opacity: 0.1 }} />
            <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 4, 4, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
