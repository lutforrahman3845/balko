/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
  { time: "0:00", value: 300, target: 400 },
  { time: "04:00", value: 200, target: 450 },
  { time: "08:00", value: 450, target: 400 },
  { time: "12:00", value: 700, target: 550 },
  { time: "16:00", value: 650, target: 600 },
  { time: "20:00", value: 500, target: 580 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-lg shadow-xl">
        <p className="text-muted-foreground text-xs font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="capitalize">{entry.name}:</span>
            <span>{entry.name === 'value' ? '$' : ''}{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardDealsGraph = () => {
  const [timeRange, setTimeRange] = useState("Week");
  const ranges = ["Day", "Week", "Month", "Year"];

  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Deals Overview</span>
        <div className="flex gap-1 bg-muted/30 p-1 rounded-full border">
          {ranges.map((range) => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                timeRange === range 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Closed Deals</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">18</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500">+4 deals</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Pipeline Value</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">$2.8M</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500">+$420K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Conversion Rate</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">23%</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500">+5%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.12}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#888888" strokeOpacity={0.2} />
            <XAxis 
              dataKey="time" 
              stroke="none"
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dy={10}
              tick={{ fill: '#888888' }}
            />
            <YAxis 
              stroke="none"
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              dx={-10}
              tickFormatter={(value) => `$${value}`}
              tick={{ fill: '#888888' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorTarget)"
              activeDot={{ r: 5, fill: "#94a3b8", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 5, fill: "#2563eb", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardDealsGraph;
