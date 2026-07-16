"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const overviewData = [
  {
    title: "Total Contacts",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    previous: "1,110",
    chartData: [{ v: 10 }, { v: 15 }, { v: 13 }, { v: 22 }, { v: 28 }, { v: 25 }, { v: 35 }],
  },
  {
    title: "Active Deals",
    value: "89",
    change: "-5.2%",
    trend: "down",
    previous: "94",
    chartData: [{ v: 35 }, { v: 30 }, { v: 32 }, { v: 25 }, { v: 28 }, { v: 20 }, { v: 18 }],
  },
  {
    title: "Pipeline Value",
    value: "$2.8M",
    change: "+8.7%",
    trend: "up",
    previous: "$2.6M",
    chartData: [{ v: 1.5 }, { v: 1.8 }, { v: 1.7 }, { v: 2.1 }, { v: 2.5 }, { v: 2.6 }, { v: 2.8 }],
  },
  {
    title: "Companies",
    value: "156",
    change: "+4.1%",
    trend: "up",
    previous: "150",
    chartData: [{ v: 140 }, { v: 142 }, { v: 145 }, { v: 148 }, { v: 152 }, { v: 154 }, { v: 156 }],
  },
];

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => {
        const isUp = item.trend === "up";
        const color = isUp ? "#10b981" : "#f43f5e"; // Emerald for up, Rose for down
        
        return (
          <div
            key={index}
            className="group relative p-5 rounded-2xl border bg-card/80 backdrop-blur-md text-card-foreground shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Chart Glow (Subtle) */}
            <div 
              className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-10 transition-opacity blur-2xl" 
              style={{ backgroundColor: color }}
            />
            
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-sm font-semibold text-muted-foreground">{item.title}</span>
              </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <h2 className="text-3xl font-bold tracking-tight">{item.value}</h2>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isUp
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {isUp ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {item.change}
              </div>
            </div>
            
            <div className="text-xs font-medium text-muted-foreground mb-4 relative z-10">
              Vs last month: <span className="text-foreground">{item.previous}</span>
            </div>

            {/* Sparkline Chart */}
            <div className="h-12 w-full mt-auto relative z-10 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.chartData}>
                  <defs>
                    <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="v" 
                    stroke={color} 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill={`url(#color-${index})`} 
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
