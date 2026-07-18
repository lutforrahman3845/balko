"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AUTH_INPUT_CLASS,
  PasswordInput,
  AuthSubmitButton,
} from "@/components/Auth/AuthCard";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo only — no real authentication. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully signed in!");
      router.push("/");
    }, 1500);
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </>
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
            defaultValue="ceo@balko.com"
            required
            className={AUTH_INPUT_CLASS}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            defaultValue="@123456"
            required
            disabled={isLoading}
          />
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Signing in...">
          Sign In
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
