"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const PERFORMERS = [
  { name: "Alex Chen", avatar: "/avatars/avatar-1.jpg", deals: 32, revenue: "$482K", pct: 100 },
  { name: "Maria Garcia", avatar: "/avatars/avatar-2.jpg", deals: 28, revenue: "$421K", pct: 87 },
  { name: "James Wilson", avatar: "/avatars/avatar-3.jpg", deals: 24, revenue: "$356K", pct: 74 },
  { name: "Sarah Jenkins", avatar: "/avatars/avatar-5.jpg", deals: 19, revenue: "$298K", pct: 62 },
  { name: "David Park", avatar: "/avatars/avatar-7.jpg", deals: 15, revenue: "$214K", pct: 45 },
];

const DashboardLeaderboard = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Trophy className="size-4 text-muted-foreground" />
          <div>
            <h3 className="text-sm font-semibold">Top Performers</h3>
            <p className="text-xs text-muted-foreground">Sales reps this quarter</p>
          </div>
        </div>
        <span className="text-xs font-medium text-muted-foreground">Q3 2026</span>
      </div>

      <div className="flex flex-1 flex-col divide-y">
        {PERFORMERS.map((p, i) => (
          <div key={p.name} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <span
              className={cn(
                "w-4 shrink-0 text-center text-sm font-semibold tabular-nums",
                i === 0 ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {i + 1}
            </span>

            <Image
              src={p.avatar}
              alt={p.name}
              width={40}
              height={40}
              className="size-9 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium">{p.name}</span>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                  {p.revenue}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {p.deals} deals
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLeaderboard;
