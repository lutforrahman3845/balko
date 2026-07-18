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
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const SELECT_CLASS =
  "h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/20";

export function GeneralSettings() {
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Preferences saved.");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Set your language, timezone, and date format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select id="language" className={SELECT_CLASS} defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select id="timezone" className={SELECT_CLASS} defaultValue="pst">
                  <option value="pst">(GMT-08:00) Pacific Time</option>
                  <option value="est">(GMT-05:00) Eastern Time</option>
                  <option value="utc">(GMT+00:00) UTC</option>
                  <option value="cet">(GMT+01:00) Central European</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date format</Label>
                <select id="dateFormat" className={SELECT_CLASS} defaultValue="mdy">
                  <option value="mdy">MM/DD/YYYY</option>
                  <option value="dmy">DD/MM/YYYY</option>
                  <option value="ymd">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startWeek">Start of week</Label>
                <select id="startWeek" className={SELECT_CLASS} defaultValue="mon">
                  <option value="sun">Sunday</option>
                  <option value="mon">Monday</option>
                </select>
              </div>
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save preferences"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all of its data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            Delete account
          </Button>
        </CardContent>
      </Card>

      {confirmOpen && (
        <ConfirmDialog
          isOpen={confirmOpen}
          type="danger"
          title="Delete account"
          onClose={() => setConfirmOpen(false)}
          onCancel={() => setConfirmOpen(false)}
          confirmButtonType="destructive"
          onConfirm={() => {
            toast.success("Account deletion requested (demo).");
            setConfirmOpen(false);
          }}
        >
          <span>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </span>
        </ConfirmDialog>
      )}
    </div>
  );
}
