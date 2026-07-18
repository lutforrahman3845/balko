"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error-reporting service here.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-background px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] dark:opacity-[0.05]">
        <h1 className="text-[11rem] font-black tracking-tighter sm:text-[15rem] md:text-[20rem] lg:text-[25rem]">
          500
        </h1>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="mb-6 flex justify-center">
          <div className="dark:hidden flex items-center">
            <Image
              width={200}
              height={200}
              src="/logo/balcowhite.svg"
              alt="logo"
              className="h-32 w-32"
            />
          </div>
          <div className="hidden dark:flex items-center">
            <Image
              width={200}
              height={200}
              src="/logo/balcoblack.svg"
              alt="logo"
              className="h-32 w-32"
            />
          </div>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Something went wrong
        </h1>

        <p className="mt-6 text-lg leading-7 text-muted-foreground max-w-lg mx-auto">
          An unexpected error occurred. You can try again, or head back to your
          dashboard.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={reset}
            className="rounded-full px-8 shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-100 w-100 -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[120px] rounded-full"></div>
    </div>
  );
}
