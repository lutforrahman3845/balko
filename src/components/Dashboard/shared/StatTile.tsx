"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export type TrendDirection = "up" | "down" | "flat";

interface StatTileProps {
  label: string;
  value: string;
  /** Formatted change, e.g. "12.3%". The sign is rendered from `direction`. */
  change?: string;
  direction?: TrendDirection;
  /**
   * Whether an increase is good. Churn going up is bad; revenue going up is
   * good — the tile must not assume "up is green".
   */
  higherIsBetter?: boolean;
  /** Period the change is measured against, e.g. "vs last month". */
  comparison?: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional sparkline. Shape context only — no axes, no labels. */
  trend?: number[];
  className?: string;
}

/**
 * A single headline figure.
 *
 * The number is the point, so it is set large in tabular figures and nothing
 * competes with it. The delta carries an arrow and a sign as well as a color,
 * so its meaning survives grayscale, colorblindness, and forced-colors mode.
 */
export function StatTile({
  label,
  value,
  change,
  direction = "flat",
  higherIsBetter = true,
  comparison,
  icon: Icon,
  trend,
  className,
}: StatTileProps) {
  const isGood =
    direction === "flat"
      ? null
      : (direction === "up") === higherIsBetter;

  const DirectionIcon =
    direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : Minus;

  const sign = direction === "up" ? "+" : direction === "down" ? "−" : "";

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-colors hover:border-foreground/15",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-4.5" />
          </span>
        )}
      </div>

      <p
        data-numeric
        className="mt-3 text-3xl font-semibold tracking-tight tabular-nums"
      >
        {value}
      </p>

      {change && (
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              isGood === null && "text-muted-foreground",
              isGood === true && "text-success",
              isGood === false && "text-destructive",
            )}
          >
            <DirectionIcon className="size-3.5" aria-hidden />
            {sign}
            {change}
          </span>
          {comparison && (
            <span className="text-muted-foreground">{comparison}</span>
          )}
        </p>
      )}

      {trend && trend.length > 1 && (
        <div className="mt-4 h-10" aria-hidden>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend.map((v) => ({ v }))}>
              <defs>
                <linearGradient
                  id={`spark-${label.replace(/\W/g, "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill={`url(#spark-${label.replace(/\W/g, "")})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
