"use client";

import { ArrowUp, ArrowDown, DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

const STATS = [
  { title: "Revenue", value: "$128,430", change: "+14.2%", up: true, icon: DollarSign },
  { title: "New Users", value: "3,842", change: "+9.1%", up: true, icon: Users },
  { title: "Orders", value: "1,219", change: "-2.4%", up: false, icon: ShoppingCart },
  { title: "Conversion", value: "4.7%", change: "+0.8%", up: true, icon: Activity },
];

export function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((s) => (
        <div
          key={s.title}
          className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="size-5" />
            </span>
            <span
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                s.up
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-rose-500/10 text-rose-500"
              }`}
            >
              {s.up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
              {s.change}
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{s.value}</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{s.title}</p>
        </div>
      ))}
    </div>
  );
}
