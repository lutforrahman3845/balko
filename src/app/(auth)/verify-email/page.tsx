"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthCard, AuthSubmitButton } from "@/components/Auth/AuthCard";

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = clean;
      return next;
    });
    if (clean && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const onKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setIsLoading(true);

    // Demo only — no code is validated. Wire your backend here.
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email verified!");
      router.push("/");
    }, 1500);
  };

  return (
    <AuthCard
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent to your inbox"
      footer={
        <>
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            onClick={() => toast.success("A new code has been sent.")}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Resend
          </button>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center gap-2" onPaste={onPaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              disabled={isLoading}
              className={cn(
                "size-12 rounded-lg border border-border bg-background text-center text-lg font-semibold shadow-sm outline-none transition-[color,box-shadow]",
                "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-blue-600/20",
                "disabled:pointer-events-none disabled:opacity-50",
              )}
            />
          ))}
        </div>

        <AuthSubmitButton loading={isLoading} loadingText="Verifying...">
          Verify Email
        </AuthSubmitButton>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/sign-in"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}
