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
    <div className="p-6 rounded-2xl border bg-card/80 backdrop-blur-md text-card-foreground shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
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
        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded-full border bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Closed Deals</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">18</span>
              <span className="text-xs font-medium text-emerald-500">+4 deals</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded-full border bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Pipeline Value</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">$2.8M</span>
              <span className="text-xs font-medium text-blue-500">+$420K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded-full border bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Conversion Rate</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">23%</span>
              <span className="text-xs font-medium text-purple-500">+5%</span>
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
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="hsl(var(--border))" opacity={0.3} />
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
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
              activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 0 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0, stroke: "hsl(var(--background))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardDealsGraph;
