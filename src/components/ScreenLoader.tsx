"use client";

import { Loader2 } from "lucide-react";

export function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        {/* Loading Spinner */}
        <div className="relative flex items-center justify-center text-primary">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>

        {/* Branding & Loading State */}
        <div className="mt-4 flex items-center gap-2">
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
