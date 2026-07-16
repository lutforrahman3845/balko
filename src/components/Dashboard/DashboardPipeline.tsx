"use client";

import { MoreHorizontal, ArrowUp, BarChart3, Edit, Share, Trash2 } from "lucide-react";
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const data = [
  { name: "Lead", value: 800, count: 45, fill: "#3b82f6" }, 
  { name: "Contacted", value: 600, count: 22, fill: "#6366f1" }, 
  { name: "Proposal", value: 950, count: 14, fill: "#a855f7" }, 
  { name: "Won", value: 490, count: 8, fill: "#10b981" }, 
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-xl shadow-2xl flex flex-col gap-1">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">{data.name}</p>
        <div className="flex items-center gap-3 text-foreground">
          <div className="flex items-center gap-2 text-base font-bold">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
            <span>${data.value}k</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs font-semibold text-muted-foreground">{data.count} deals</span>
        </div>
      </div>
    );
  }
  return null;
};

const DashboardPipeline = () => {
  return (
    <div className="p-6 rounded-3xl border bg-card/80 backdrop-blur-md text-card-foreground shadow-sm flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Pipeline Revenue</h3>
            <p className="text-xs text-muted-foreground">Current sales stages</p>
          </div>
        </div>
        
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-xl">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="w-4 h-4 mr-2" />
              Edit Widget
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Share className="w-4 h-4 mr-2" />
              Export Data
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        <div className="flex items-end gap-3 mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight">$2.84M</h1>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 mb-1">
            <ArrowUp className="w-3 h-3" />
            8.7%
          </div>
        </div>
        <p className="text-xs font-medium text-muted-foreground">Total pipeline value vs last month</p>
      </div>

      {/* Recharts ComposedChart */}
      <div className="flex-1 w-full min-h-[240px] mt-2 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={data} 
            margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="pipelineArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888888', fontSize: 12, fontWeight: 600 }} 
              dy={10}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.4)', rx: 8 }} />
            
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="none" 
              fill="url(#pipelineArea)" 
            />
            <Bar dataKey="value" barSize={36} radius={[6, 6, 6, 6]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
              ))}
            </Bar>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))", stroke: "#8b5cf6" }} 
              activeDot={{ r: 8, strokeWidth: 0, fill: "#8b5cf6" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPipeline;
