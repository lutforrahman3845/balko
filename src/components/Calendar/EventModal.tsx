"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CalEvent } from "./types";

export const EVENT_COLORS = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Violet", value: "bg-violet-500" },
  { name: "Rose", value: "bg-rose-500" },
];

type Draft = {
  id?: string;
  title: string;
  date: string; // yyyy-MM-dd
  time: string; // HH:mm or ""
  color: string;
};

const EMPTY: Draft = {
  title: "",
  date: "",
  time: "",
  color: EVENT_COLORS[0].value,
};

export function EventModal({
  open,
  onOpenChange,
  initial,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Partial<CalEvent> | null;
  onSave: (event: CalEvent) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Draft>(EMPTY);

  // Reset the form each time the modal opens with new data.
  useEffect(() => {
    if (open) {
      setDraft({
        id: initial?.id,
        title: initial?.title ?? "",
        date: initial?.date ?? "",
        time: initial?.time ?? "",
        color: initial?.color ?? EVENT_COLORS[0].value,
      });
    }
  }, [open, initial]);

  const isEditing = Boolean(draft.id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.date) return;
    onSave({
      id: draft.id ?? crypto.randomUUID(),
      title: draft.title.trim(),
      date: draft.date,
      time: draft.time,
      color: draft.color,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit event" : "New event"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details for this event."
              : "Add an event to your calendar."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Title</Label>
            <Input
              id="event-title"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="Team standup"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <Input
                id="event-date"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <Input
                id="event-time"
                type="time"
                value={draft.time}
                onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  aria-label={c.name}
                  onClick={() => setDraft((d) => ({ ...d, color: c.value }))}
                  className={cn(
                    "size-7 rounded-full ring-offset-2 ring-offset-background transition-transform hover:scale-110",
                    c.value,
                    draft.color === c.value && "ring-2 ring-foreground",
                  )}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            {isEditing ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  if (draft.id) onDelete(draft.id);
                  onOpenChange(false);
                }}
              >
                <Trash2 className="size-4" /> Delete
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Save" : "Add event"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
