"use client";

import Image from "next/image";

export function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        {/* Logo with Pulse Effect */}
        <div className="relative animate-pulse">
          <div className="dark:hidden flex items-center">
            <Image
              width={200}
              height={200}
              src="/logo/balcowhite.svg"
              alt="logo"
              className="h-32 w-32 transition-transform group-hover:rotate-12"
            />
          </div>
          <div className="hidden dark:flex items-center">
            <Image
              width={200}
              height={200}
              src="/logo/balcoblack.svg"
              alt="logo"
              className="h-32 w-32 transition-transform group-hover:rotate-12"
            />
          </div>
        </div>

        {/* Branding & Loading State */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-foreground font-bold tracking-[0.2em] text-sm uppercase">
            Balko
          </span>
          <div className="flex items-center gap-1.5 pt-1">
            <div className="h-1 w-1 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1 w-1 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1 w-1 rounded-full bg-primary animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
