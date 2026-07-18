"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shared field styling so every auth screen matches the sign-in card. */
export const AUTH_INPUT_CLASS =
  "h-12 rounded-lg border-border bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600/20";

/** The centered card chrome (logo + title + subtitle + content + optional footer). */
export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative z-10 w-full max-w-sm mx-auto overflow-hidden">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100 dark:border-zinc-800">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity group"
          >
            <div className="dark:hidden flex items-center">
              <Image
                width={160}
                height={48}
                src="/logo/balcofullwhite.svg"
                alt="Balko"
                className="h-11 w-auto max-w-none transition-transform group-hover:scale-105"
              />
            </div>
            <div className="hidden dark:flex items-center">
              <Image
                width={160}
                height={48}
                src="/logo/balcofullblack.svg"
                alt="Balko"
                className="h-11 w-auto max-w-none transition-transform group-hover:scale-105"
              />
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>

          {children}

          {footer && (
            <p className="text-center text-sm text-muted-foreground pt-2">
              {footer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Password input with a show/hide toggle, styled to match AUTH_INPUT_CLASS. */
export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn(AUTH_INPUT_CLASS, "pr-12", className)}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
        onClick={() => setShow((prev) => !prev)}
        tabIndex={-1}
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}

/** Full-width submit button with the blue accent + loading spinner. */
export function AuthSubmitButton({
  loading,
  loadingText,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText ?? "Please wait..."}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
