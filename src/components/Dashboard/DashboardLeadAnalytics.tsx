"use client";

import { BarChart2, Info, ArrowUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { time: "5D", value: 120 },
  { time: "2W", value: 160 },
  { time: "1M", value: 140 },
  { time: "3M", value: 190 },
  { time: "6M", value: 240 },
];

const DashboardLeadAnalytics = () => {
  return (
    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg border bg-muted/20">
            <BarChart2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Lead Analytics</div>
            <div className="text-[11px] text-muted-foreground">Lead generation and conversion</div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight mb-2">160</h2>
        <div className="flex items-center gap-1 text-xs font-medium">
          <span className="text-emerald-500 flex items-center">
            <ArrowUp className="w-3 h-3 mr-0.5" /> +18%
          </span>
          <span className="text-muted-foreground">compared to last week</span>
        </div>
      </div>

      <div className="flex w-full mb-4">
        {["5D", "2W", "1M", "6M"].map((tab) => (
          <div key={tab} className="flex-1 text-center py-2 text-[11px] font-medium border-b border-muted hover:border-foreground cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            {tab}
          </div>
        ))}
      </div>

      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
             <defs>
              <linearGradient id="colorLead" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--chart-5)"
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorLead)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLeadAnalytics;
