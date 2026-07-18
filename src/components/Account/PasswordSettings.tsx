"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/Auth/AuthCard";

export function PasswordSettings() {
  const [saving, setSaving] = useState(false);
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (next !== confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    setSaving(true);
    // Demo only — nothing changes. Wire your backend here.
    setTimeout(() => {
      setSaving(false);
      setNext("");
      setConfirm("");
      toast.success("Password changed.");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Use a strong password you don&apos;t reuse elsewhere.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="max-w-md space-y-5">
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <PasswordInput id="current" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <PasswordInput
              id="new"
              required
              minLength={6}
              className="h-11"
              value={next}
              onChange={(e) => setNext(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm new password</Label>
            <PasswordInput
              id="confirm"
              required
              minLength={6}
              className="h-11"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
