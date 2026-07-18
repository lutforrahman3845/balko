"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Demo data — replace with your real user record.
const DEFAULTS = {
  firstName: "Jon",
  lastName: "Snow",
  email: "ceo@balko.com",
  phone: "+1 (555) 012-3456",
  jobTitle: "Chief Executive Officer",
  company: "Balko Inc.",
  location: "San Francisco, CA",
  bio: "Building tools that help teams ship faster. Coffee-driven and deadline-friendly.",
};

export function ProfileForm() {
  const [saving, setSaving] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    // Demo only — nothing persists. Wire your backend here.
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile updated.");
    }, 1000);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile photo</CardTitle>
          <CardDescription>
            This will be displayed on your profile and to your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src="/avatars/avatar-4.jpg"
                alt="Profile photo"
                width={200}
                height={200}
                className="size-20 rounded-full border object-cover"
              />
              <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm">
                <Camera className="size-3.5 text-muted-foreground" />
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toast.info("Upload is disabled in the demo.")}
              >
                Upload new
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => toast.info("Photo removed (demo).")}
              >
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Update your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="First name" defaultValue={DEFAULTS.firstName} />
            <Field id="lastName" label="Last name" defaultValue={DEFAULTS.lastName} />
            <Field id="email" label="Email" type="email" defaultValue={DEFAULTS.email} />
            <Field id="phone" label="Phone" defaultValue={DEFAULTS.phone} />
            <Field id="jobTitle" label="Job title" defaultValue={DEFAULTS.jobTitle} />
            <Field id="company" label="Company" defaultValue={DEFAULTS.company} />
          </div>
          <Field id="location" label="Location" defaultValue={DEFAULTS.location} />
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} defaultValue={DEFAULTS.bio} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} defaultValue={defaultValue} />
    </div>
  );
}
