"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";
import { cn } from "@/lib/utils";

const team = [
  { name: "Alex Chen", avatar: "/avatars/avatar-1.jpg", assigned: 14, capacity: 16 },
  { name: "Maria Garcia", avatar: "/avatars/avatar-2.jpg", assigned: 19, capacity: 16 },
  { name: "James Wilson", avatar: "/avatars/avatar-3.jpg", assigned: 11, capacity: 16 },
  { name: "Priya Nair", avatar: "/avatars/avatar-4.jpg", assigned: 16, capacity: 16 },
  { name: "Tom Becker", avatar: "/avatars/avatar-5.jpg", assigned: 7, capacity: 16 },
];

/**
 * Load against capacity per person. Over-capacity is a state, not a series, so
 * it uses the status color and is also called out in words — the bar alone
 * would leave the meaning to color.
 */
export function OperationsWorkload() {
  const scaleMax = Math.max(...team.map((member) => member.capacity)) * 1.35;

  return (
    <DashboardCard
      title="Team workload"
      description="Assigned tasks against weekly capacity"
      icon={Users}
    >
      <ul className="flex flex-col gap-4">
        {team.map((member) => {
          const over = member.assigned > member.capacity;

          return (
            <li key={member.name} className="flex items-center gap-3">
              <Image
                src={member.avatar}
                alt=""
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full border border-border"
              />

              <div className="flex min-w-0 grow flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium">
                    {member.name}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span
                      data-numeric
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        over && "text-destructive",
                      )}
                    >
                      {member.assigned}/{member.capacity}
                    </span>
                    {over && (
                      <span className="text-xs font-medium text-destructive">
                        Over
                      </span>
                    )}
                  </span>
                </div>

                <div className="relative h-2 w-full rounded-full bg-muted">
                  <div
                    className="absolute inset-y-0 start-0 rounded-full"
                    style={{
                      width: `${Math.min((member.assigned / scaleMax) * 100, 100)}%`,
                      backgroundColor: over
                        ? "var(--destructive)"
                        : "var(--chart-1)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-[-3px] w-px bg-foreground/45"
                    style={{
                      insetInlineStart: `${(member.capacity / scaleMax) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <span aria-hidden className="h-3 w-px bg-foreground/45" />
        Capacity
      </p>
    </DashboardCard>
  );
}
