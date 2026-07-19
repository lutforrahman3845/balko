"use client";

import { CircleCheck, CircleDot, HeartPulse, TriangleAlert } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { cn } from "@/lib/utils";

type Health = "on-track" | "at-risk" | "off-track";

const HEALTH: Record<
  Health,
  { label: string; icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  "on-track": { label: "On track", icon: CircleCheck, className: "text-success" },
  "at-risk": { label: "At risk", icon: CircleDot, className: "text-foreground" },
  "off-track": { label: "Off track", icon: TriangleAlert, className: "text-destructive" },
};

const projects: {
  name: string;
  client: string;
  health: Health;
  progress: number;
  due: string;
}[] = [
  { name: "Atlas migration", client: "Stark Industries", health: "on-track", progress: 82, due: "Aug 14" },
  { name: "Payments revamp", client: "Cyberdyne", health: "at-risk", progress: 54, due: "Aug 02" },
  { name: "Mobile onboarding", client: "Massive Dynamic", health: "on-track", progress: 71, due: "Sep 09" },
  { name: "Data warehouse", client: "Initech", health: "off-track", progress: 28, due: "Jul 25" },
  { name: "Partner portal", client: "Umbrella Co", health: "on-track", progress: 63, due: "Sep 30" },
];

/**
 * Health is a state, so it ships as icon + word + color rather than a colored
 * dot alone. Progress is a magnitude read per row, which a short inline bar
 * answers faster than a number on its own.
 */
export function OperationsProjectHealth() {
  return (
    <DashboardCard
      title="Project health"
      description="Active engagements by delivery status"
      icon={HeartPulse}
    >
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-125 border-collapse text-sm">
          <thead>
            <tr className="text-start text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="px-2 pb-3 text-start font-medium">Project</th>
              <th scope="col" className="px-2 pb-3 text-start font-medium">Status</th>
              <th scope="col" className="px-2 pb-3 text-start font-medium">Progress</th>
              <th scope="col" className="px-2 pb-3 text-end font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const status = HEALTH[project.health];
              const StatusIcon = status.icon;

              return (
                <tr key={project.name} className="border-t border-border">
                  <td className="px-2 py-3">
                    <span className="block font-medium">{project.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {project.client}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium",
                        status.className,
                      )}
                    >
                      <StatusIcon className="size-3.5" aria-hidden />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-20 shrink-0 rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-[var(--chart-1)]"
                          style={{ width: `${project.progress}%` }}
                        />
                      </span>
                      <span
                        data-numeric
                        className="text-xs text-muted-foreground tabular-nums"
                      >
                        {project.progress}%
                      </span>
                    </span>
                  </td>
                  <td className="px-2 py-3 text-end text-muted-foreground tabular-nums">
                    {project.due}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
