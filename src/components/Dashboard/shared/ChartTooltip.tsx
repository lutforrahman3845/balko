"use client";

/**
 * Shared Recharts tooltip.
 *
 * Every chart previously declared its own copy of this, each typed `any`. One
 * typed implementation keeps the hover layer consistent and removes the
 * `any`s. Series identity is carried by a swatch beside the label, never by
 * coloring the text itself.
 */

interface TooltipEntry {
  name?: string | number;
  value?: string | number;
  color?: string;
  dataKey?: string | number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  /** Formats each value, e.g. `(v) => \`$\${v}k\``. */
  format?: (value: string | number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  format = (value) => String(value),
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm">
      {label !== undefined && (
        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
      )}
      <ul className="flex flex-col gap-1.5">
        {payload.map((entry, index) => (
          <li
            key={`${entry.dataKey ?? index}`}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span data-numeric className="font-semibold tabular-nums">
              {entry.value !== undefined ? format(entry.value) : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
