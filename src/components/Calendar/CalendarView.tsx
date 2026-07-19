"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventModal } from "./EventModal";
import type { CalEvent } from "./types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const iso = (d: Date) => format(d, "yyyy-MM-dd");
const today = new Date();
const todayKey = iso(today);

// Demo events anchored to today so they show on first load.
const INITIAL_EVENTS: CalEvent[] = [
  { id: "e1", title: "Team standup", date: iso(today), time: "09:30", color: "bg-blue-500" },
  { id: "e2", title: "Design review", date: iso(today), time: "14:00", color: "bg-violet-500" },
  { id: "e3", title: "1:1 with Sarah", date: iso(addDays(today, 1)), time: "11:00", color: "bg-emerald-500" },
  { id: "e4", title: "Sprint planning", date: iso(addDays(today, 2)), time: "", color: "bg-amber-500" },
  { id: "e5", title: "Client demo", date: iso(addDays(today, 4)), time: "16:00", color: "bg-rose-500" },
  { id: "e6", title: "Retro", date: iso(addDays(today, -2)), time: "15:00", color: "bg-emerald-500" },
];

export function CalendarView() {
  const [cursor, setCursor] = useState(today);
  const [events, setEvents] = useState<CalEvent[]>(INITIAL_EVENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<CalEvent> | null>(null);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor));
    const end = endOfWeek(endOfMonth(cursor));
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const eventsFor = (key: string) =>
    events
      .filter((e) => e.date === key)
      .sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));

  const openNew = (dateKey: string) => {
    setEditing({ date: dateKey });
    setModalOpen(true);
  };

  const openEdit = (event: CalEvent) => {
    setEditing(event);
    setModalOpen(true);
  };

  const saveEvent = (event: CalEvent) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      return exists ? prev.map((e) => (e.id === event.id ? event : e)) : [...prev, event];
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

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
          <Button size="sm" onClick={() => openNew(todayKey)}>
            <Plus className="size-4" /> New event
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
          const key = iso(day);
          const inMonth = isSameMonth(day, cursor);
          const isToday = key === todayKey;
          const dayEvents = eventsFor(key);

          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => openNew(key)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") openNew(key);
              }}
              className={cn(
                "group min-h-24 sm:min-h-28 cursor-pointer border-b border-r p-1.5 text-left align-top transition-colors hover:bg-muted/40 nth-[7n]:border-r-0",
                !inMonth && "bg-muted/30",
              )}
            >
              <div className="flex items-center justify-between">
                <Plus className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
                {dayEvents.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    role="button"
                    tabIndex={0}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openEdit(e);
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.stopPropagation();
                        ev.preventDefault();
                        openEdit(e);
                      }
                    }}
                    className="flex items-center gap-1.5 rounded bg-muted/60 px-1.5 py-0.5 text-[11px] hover:bg-muted"
                  >
                    <span className={cn("size-1.5 shrink-0 rounded-full", e.color)} />
                    {e.time && (
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {e.time}
                      </span>
                    )}
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

      <EventModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initial={editing}
        onSave={saveEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}
