"use client";

import { Target } from "lucide-react";

const ACCENT = "#2563eb";

type Goal = {
  label: string;
  value: string;
  pct: number;
};

const GOALS: Goal[] = [
  { label: "Revenue target", value: "$2.8M / $3.6M", pct: 78 },
  { label: "Deals won", value: "64 / 100", pct: 64 },
  { label: "New customers", value: "182 / 200", pct: 91 },
];

function Ring({ goal }: { goal: Goal }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative grid size-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${ACCENT} ${goal.pct * 3.6}deg, var(--muted) 0deg)`,
        }}
      >
        <div className="absolute inset-2 grid place-items-center rounded-full bg-card">
          <span className="text-lg font-semibold tracking-tight">{goal.pct}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium">{goal.label}</div>
        <div className="text-xs text-muted-foreground">{goal.value}</div>
      </div>
    </div>
  );
}

const DashboardGoals = () => {
  return (
    <div className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Target className="size-4 text-muted-foreground" />
          <div>
            <h3 className="text-sm font-semibold">Monthly Goals</h3>
            <p className="text-xs text-muted-foreground">Progress toward Q3 targets</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-around gap-6">
        {GOALS.map((g) => (
          <Ring key={g.label} goal={g} />
        ))}
      </div>

      <div className="mt-6 border-t pt-4 text-center text-xs text-muted-foreground">
        On track to hit <span className="font-medium text-foreground">2 of 3</span> goals
        this quarter.
      </div>
    </div>
  );
};

export default DashboardGoals;
