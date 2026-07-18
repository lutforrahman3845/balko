"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, MailCheck } from "lucide-react";
import {
  AuthCard,
  AUTH_INPUT_CLASS,
  AuthSubmitButton,
} from "@/components/Auth/AuthCard";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo only — no email is sent. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
      toast.success("Reset link sent — check your inbox.");
    }, 1500);
  };

  if (sent) {
    return (
      <AuthCard
        title="Check your email"
        subtitle="We've sent a password reset link to your inbox. It may take a minute to arrive."
        footer={
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 font-medium"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </Link>
        }
      >
        <div className="flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
            <MailCheck className="size-8 text-blue-600" />
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 font-medium"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            className={AUTH_INPUT_CLASS}
            disabled={isLoading}
          />
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Sending link...">
          Send Reset Link
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
