"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalEvent = { date: Date; title: string; color: string };

// Demo events anchored to today so they show on first load.
const today = new Date();
const EVENTS: CalEvent[] = [
  { date: today, title: "Team standup", color: "bg-blue-500" },
  { date: today, title: "Design review", color: "bg-violet-500" },
  { date: addDays(today, 1), title: "1:1 with Sarah", color: "bg-emerald-500" },
  { date: addDays(today, 2), title: "Sprint planning", color: "bg-amber-500" },
  { date: addDays(today, 4), title: "Client demo", color: "bg-rose-500" },
  { date: addDays(today, 4), title: "Release cut", color: "bg-blue-500" },
  { date: addDays(today, -2), title: "Retro", color: "bg-emerald-500" },
  { date: addDays(today, 9), title: "Board meeting", color: "bg-violet-500" },
];

export function CalendarView() {
  const [cursor, setCursor] = useState(today);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor));
    const end = endOfWeek(endOfMonth(cursor));
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const eventsFor = (day: Date) => EVENTS.filter((e) => isSameDay(e.date, day));

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <h2 className="text-lg font-semibold tracking-tight">
          {format(cursor, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCursor(today)}>
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCursor((c) => subMonths(c, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const inMonth = isSameMonth(day, cursor);
          const isToday = isSameDay(day, today);
          const dayEvents = eventsFor(day);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-24 sm:min-h-28 border-b border-r p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0",
                !inMonth && "bg-muted/30",
              )}
            >
              <div className="flex justify-end">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs font-medium",
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : inMonth
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] bg-muted/60 truncate"
                  >
                    <span className={cn("size-1.5 rounded-full shrink-0", e.color)} />
                    <span className="truncate">{e.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="px-1.5 text-[11px] text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
