"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Pref = { key: string; label: string; description: string; on: boolean };

const INITIAL: Pref[] = [
  {
    key: "product",
    label: "Product updates",
    description: "News about features and improvements.",
    on: true,
  },
  {
    key: "mentions",
    label: "Mentions & comments",
    description: "When someone mentions you or replies to you.",
    on: true,
  },
  {
    key: "tasks",
    label: "Task assignments",
    description: "When a task is assigned to you or its due date changes.",
    on: true,
  },
  {
    key: "digest",
    label: "Weekly digest",
    description: "A summary of your team's activity every Monday.",
    on: false,
  },
  {
    key: "marketing",
    label: "Marketing emails",
    description: "Tips, offers, and occasional announcements.",
    on: false,
  },
];

export function NotificationSettings() {
  const [prefs, setPrefs] = useState(INITIAL);

  const toggle = (key: string, value: boolean) => {
    setPrefs((prev) =>
      prev.map((p) => (p.key === key ? { ...p, on: value } : p)),
    );
    toast.success("Preference saved.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>
          Choose what we email you about. You can change these anytime.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        {prefs.map((p) => (
          <div
            key={p.key}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{p.label}</p>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>
            <Switch
              checked={p.on}
              onCheckedChange={(v) => toggle(p.key, v)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
