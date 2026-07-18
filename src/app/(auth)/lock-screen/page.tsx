"use client";

import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  PasswordInput,
  AuthSubmitButton,
} from "@/components/Auth/AuthCard";

export default function LockScreenPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo only — no password is checked. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!");
      router.push("/");
    }, 1500);
  };

  return (
    <AuthCard
      title="Jon Snow"
      subtitle="Enter your password to unlock"
      footer={
        <>
          Not you?{" "}
          <Link
            href="/sign-in"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in as another user
          </Link>
        </>
      }
    >
      <div className="flex justify-center">
        <Image
          src="/avatars/avatar-4.jpg"
          alt="Jon Snow"
          width={200}
          height={200}
          className="size-20 rounded-full border-4 border-green-500 object-cover"
        />
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password
          </Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            defaultValue="@123456"
            required
            disabled={isLoading}
          />
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Unlocking...">
          Unlock
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
