"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHome?: boolean;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while fetching the data. Please try again or contact support if the problem persists.",
  onRetry,
  showHome = false,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn(
      "flex min-h-100 flex-col items-center justify-center rounded-lg  text-center animate-in fade-in zoom-in duration-500",
      className
    )}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20 mb-6">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>

      <h3 className="text-xl font-semibold text-foreground tracking-tight mb-2">
        {title}
      </h3>
      <p className="max-w-100 text-sm text-muted-foreground leading-relaxed mb-8">
        {message}
      </p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="default"
            className="gap-2 h-10 px-6 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
        
        {showHome && (
          <Button 
            asChild
            variant="outline"
            className="gap-2 h-10 px-6"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        )}
      </div>

      {/* Decorative dots for branding consistency */}
      <div className="mt-8 flex items-center gap-1.5 opacity-30">
        <div className="h-1 w-1 rounded-full bg-red-400"></div>
        <div className="h-1 w-1 rounded-full bg-red-400"></div>
        <div className="h-1 w-1 rounded-full bg-red-400"></div>
      </div>
    </div>
  );
}
