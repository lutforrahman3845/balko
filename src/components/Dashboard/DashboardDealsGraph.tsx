"use client";

import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const data = [
  { time: "0:00", value: 300 },
  { time: "04:00", value: 200 },
  { time: "08:00", value: 450 },
  { time: "12:00", value: 700 },
  { time: "16:00", value: 650 },
  { time: "20:00", value: 500 },
];

const DashboardDealsGraph = () => {
  return (
    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold">Deals Overview</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full text-xs font-medium border bg-transparent hover:bg-muted/50 transition-colors">Day</button>
          <button className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-foreground transition-colors">Week</button>
          <button className="px-3 py-1 rounded-full text-xs font-medium border bg-transparent hover:bg-muted/50 transition-colors">Month</button>
          <button className="px-3 py-1 rounded-full text-xs font-medium border bg-transparent hover:bg-muted/50 transition-colors">Year</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full border bg-muted/20">
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Closed Deals</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">18</span>
              <span className="text-xs font-medium text-emerald-500">+4 deals</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full border bg-muted/20">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Pipeline Value</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">$2.8M</span>
              <span className="text-xs font-medium text-emerald-500">+$420K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full border bg-muted/20">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Conversion Rate</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">23%</span>
              <span className="text-xs font-medium text-emerald-500">+5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
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
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardDealsGraph;
