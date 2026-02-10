'use client';

export function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">


        {/* Logo with Pulse Effect */}
        <div className="relative animate-pulse">
          <img
            className="h-14 w-14 max-w-none drop-shadow-sm"
            src="/favicon.svg"
            alt="logo"
          />
        </div>

        {/* Branding & Loading State */}
        <div className="mt-4 flex flex-col items-center gap-2">
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
