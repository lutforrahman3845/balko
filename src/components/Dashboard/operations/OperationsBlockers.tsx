"use client";

import Link from "next/link";
import { ArrowRight, OctagonAlert } from "lucide-react";
import { DashboardCard } from "../shared/DashboardCard";

const blockers = [
  {
    task: "Vendor SSO certificate expired",
    project: "Atlas migration",
    owner: "Alex Chen",
    blockedFor: "6 days",
  },
  {
    task: "Waiting on legal sign-off",
    project: "Payments revamp",
    owner: "Maria Garcia",
    blockedFor: "4 days",
  },
  {
    task: "Staging environment unavailable",
    project: "Data warehouse",
    owner: "James Wilson",
    blockedFor: "3 days",
  },
  {
    task: "Design assets not delivered",
    project: "Mobile onboarding",
    owner: "Priya Nair",
    blockedFor: "2 days",
  },
];

/**
 * A worklist, not a chart — each row is something a person has to act on, and
 * the useful ordering is "blocked longest first" rather than any aggregate.
 */
export function OperationsBlockers() {
  return (
    <DashboardCard
      title="Blockers"
      description="Longest-running impediments first"
      icon={OctagonAlert}
      action={
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          All tasks
          <ArrowRight className="size-3.5" />
        </Link>
      }
    >
      <ul className="flex flex-col divide-y divide-border">
        {blockers.map((blocker) => (
          <li key={blocker.task} className="flex items-start gap-3 py-3 first:pt-0">
            <span
              aria-hidden
              className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive"
            />
            <div className="min-w-0 grow">
              <p className="text-sm font-medium">{blocker.task}</p>
              <p className="text-xs text-muted-foreground">
                {blocker.project} · {blocker.owner}
              </p>
            </div>
            <span
              data-numeric
              className="shrink-0 text-xs font-medium text-destructive tabular-nums"
            >
              {blocker.blockedFor}
            </span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
