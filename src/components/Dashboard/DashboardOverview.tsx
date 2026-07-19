"use client";

import { ArrowUp, ArrowDown, Users, Briefcase, DollarSign, Building2 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const ACCENT = "var(--primary)";

const overviewData = [
  {
    title: "Total Contacts",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    icon: Users,
    chartData: [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 28 }, { v: 25 }, { v: 35 }],
  },
  {
    title: "Active Deals",
    value: "89",
    change: "-5.2%",
    trend: "down",
    icon: Briefcase,
    chartData: [{ v: 35 }, { v: 30 }, { v: 32 }, { v: 25 }, { v: 28 }, { v: 20 }, { v: 18 }],
  },
  {
    title: "Pipeline Value",
    value: "$2.8M",
    change: "+8.7%",
    trend: "up",
    icon: DollarSign,
    chartData: [{ v: 1.5 }, { v: 1.8 }, { v: 1.7 }, { v: 2.1 }, { v: 2.5 }, { v: 2.6 }, { v: 2.8 }],
  },
  {
    title: "Companies",
    value: "156",
    change: "+4.1%",
    trend: "up",
    icon: Building2,
    chartData: [{ v: 140 }, { v: 142 }, { v: 145 }, { v: 148 }, { v: 152 }, { v: 154 }, { v: 156 }],
  },
];

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {overviewData.map((item, index) => {
        const isUp = item.trend === "up";
        return (
          <div
            key={index}
            className="rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-foreground/15"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <item.icon className="size-4.5" />
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  isUp ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"
                }`}
              >
                {isUp ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                {item.change}
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight">{item.value}</h2>
                <p className="mt-1 truncate text-sm text-muted-foreground">{item.title}</p>
              </div>
              <div className="h-10 w-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={item.chartData} margin={{ top: 4, bottom: 0, left: 0, right: 0 }}>
                    <defs>
                      <linearGradient id={`ov-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ACCENT} stopOpacity={0.18} />
                        <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={ACCENT}
                      strokeWidth={1.75}
                      fill={`url(#ov-${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
