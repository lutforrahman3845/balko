"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  PasswordInput,
  AuthSubmitButton,
} from "@/components/Auth/AuthCard";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    // Demo only — no password is changed. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset. Please sign in.");
      router.push("/sign-in");
    }, 1500);
  };

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Your new password must be different from previous ones"
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
          <Label htmlFor="password" className="text-sm font-semibold">
            New password
          </Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-sm font-semibold">
            Confirm password
          </Label>
          <PasswordInput
            id="confirm"
            placeholder="••••••••"
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Resetting...">
          Reset Password
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
