"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { CalEvent } from "./types";

const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 56; // px
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

const iso = (d: Date) => format(d, "yyyy-MM-dd");
const todayKey = format(new Date(), "yyyy-MM-dd");

// Full class strings so Tailwind keeps them; maps the dot color to a block look.
const BLOCK_STYLE: Record<string, string> = {
  "bg-blue-500": "border-l-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "bg-emerald-500": "border-l-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "bg-amber-500": "border-l-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "bg-violet-500": "border-l-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  "bg-rose-500": "border-l-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

function timeLabel(h: number) {
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour} ${period}`;
}

export function CalendarTimeGrid({
  days,
  events,
  onNewAt,
  onEdit,
  onReschedule,
}: {
  days: Date[];
  events: CalEvent[];
  onNewAt: (dateKey: string, time?: string) => void;
  onEdit: (event: CalEvent) => void;
  onReschedule: (id: string, dateKey: string, time?: string) => void;
}) {
  const gridCols = `3.5rem repeat(${days.length}, minmax(0, 1fr))`;

  const forDay = (key: string) => events.filter((e) => e.date === key);

  const dragProps = (e: CalEvent) => ({
    draggable: true,
    onDragStart: (ev: React.DragEvent) => {
      ev.stopPropagation();
      ev.dataTransfer.setData("text/plain", e.id);
      ev.dataTransfer.effectAllowed = "move";
    },
  });

  return (
    <div className="flex flex-col">
      {/* Day header */}
      <div className="grid border-b" style={{ gridTemplateColumns: gridCols }}>
        <div className="border-r" />
        {days.map((day) => {
          const isToday = iso(day) === todayKey;
          return (
            <div key={iso(day)} className="border-r py-2 text-center last:border-r-0">
              <div className="text-xs font-medium text-muted-foreground">
                {format(day, "EEE")}
              </div>
              <div
                className={cn(
                  "mx-auto mt-1 flex size-7 items-center justify-center rounded-full text-sm font-semibold",
                  isToday ? "bg-primary text-primary-foreground" : "text-foreground",
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>

      {/* All-day row */}
      <div className="grid border-b bg-muted/20" style={{ gridTemplateColumns: gridCols }}>
        <div className="flex items-center justify-end border-r pr-2 py-1 text-[10px] uppercase text-muted-foreground">
          All day
        </div>
        {days.map((day) => {
          const dayKey = iso(day);
          const allDay = forDay(dayKey).filter((e) => !e.time);
          return (
            <div
              key={dayKey}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={(ev) => {
                const id = ev.dataTransfer.getData("text/plain");
                if (id) onReschedule(id, dayKey, "");
              }}
              className="min-h-8 border-r p-1 last:border-r-0"
            >
              {allDay.map((e) => (
                <button
                  key={e.id}
                  {...dragProps(e)}
                  onClick={() => onEdit(e)}
                  className={cn(
                    "mb-1 block w-full cursor-grab truncate rounded border-l-2 px-1.5 py-0.5 text-left text-[11px] active:cursor-grabbing",
                    BLOCK_STYLE[e.color] ?? "border-l-primary bg-muted",
                  )}
                >
                  {e.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="max-h-[60vh] overflow-y-auto">
        <div className="grid" style={{ gridTemplateColumns: gridCols }}>
          {/* Time axis */}
          <div className="border-r">
            {HOURS.map((h) => (
              <div
                key={h}
                className="relative border-b text-right"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="absolute -top-2 right-2 text-[10px] text-muted-foreground">
                  {timeLabel(h)}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => {
            const key = iso(day);
            const timed = forDay(key).filter((e) => e.time);
            return (
              <div
                key={key}
                className="relative border-r last:border-r-0"
                style={{ height: HOURS.length * HOUR_HEIGHT }}
              >
                {/* Hour slots (click to add) */}
                {HOURS.map((h) => {
                  const slotTime = `${String(h).padStart(2, "0")}:00`;
                  return (
                    <div
                      key={h}
                      role="button"
                      tabIndex={0}
                      aria-label={`Add event at ${timeLabel(h)}`}
                      onClick={() => onNewAt(key, slotTime)}
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") onNewAt(key, slotTime);
                      }}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDrop={(ev) => {
                        const id = ev.dataTransfer.getData("text/plain");
                        if (id) onReschedule(id, key, slotTime);
                      }}
                      className="cursor-pointer border-b transition-colors hover:bg-muted/40"
                      style={{ height: HOUR_HEIGHT }}
                    />
                  );
                })}

                {/* Timed events */}
                {timed.map((e) => {
                  const [hh, mm] = e.time.split(":").map(Number);
                  if (hh < START_HOUR || hh >= END_HOUR) return null;
                  const top = (hh - START_HOUR) * HOUR_HEIGHT + (mm / 60) * HOUR_HEIGHT;
                  return (
                    <button
                      key={e.id}
                      {...dragProps(e)}
                      onClick={() => onEdit(e)}
                      className={cn(
                        "absolute inset-x-1 cursor-grab overflow-hidden rounded border-l-2 px-1.5 py-1 text-left active:cursor-grabbing",
                        BLOCK_STYLE[e.color] ?? "border-l-primary bg-muted",
                      )}
                      style={{ top, height: HOUR_HEIGHT - 4 }}
                    >
                      <div className="truncate text-[11px] font-medium">{e.title}</div>
                      <div className="truncate text-[10px] opacity-70 tabular-nums">
                        {e.time}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
