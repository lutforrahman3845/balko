"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AUTH_INPUT_CLASS,
  PasswordInput,
  AuthSubmitButton,
} from "@/components/Auth/AuthCard";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the terms to continue.");
      return;
    }
    setIsLoading(true);

    // Demo only — no account is created. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Please sign in.");
      router.push("/sign-in");
    }, 1500);
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start managing your projects in minutes"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Jon Snow"
            required
            className={AUTH_INPUT_CLASS}
            disabled={isLoading}
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password
          </Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
            disabled={isLoading}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-normal text-muted-foreground leading-snug"
          >
            I agree to the{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Creating account...">
          Create Account
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
