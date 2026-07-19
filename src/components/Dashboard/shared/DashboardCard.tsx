"use client";

import type { ReactNode } from "react";
import { MoreHorizontal, Download, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  /** One short line under the title. Say what the panel shows, not why. */
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Replaces the default overflow menu — e.g. a range switcher. */
  action?: ReactNode;
  /** Hide the overflow menu entirely (panels with nothing to export). */
  hideMenu?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Panel shell for dashboard widgets: header, optional action, body.
 *
 * Every widget previously re-declared this header and its identical overflow
 * menu inline, so a change to either meant editing a dozen files. Widgets now
 * own their content and nothing else.
 */
export function DashboardCard({
  title,
  description,
  icon: Icon,
  action,
  hideMenu = false,
  className,
  children,
}: DashboardCardProps) {
  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card p-5 text-card-foreground shadow-sm",
        className,
      )}
    >
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Icon className="size-4.5" />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{title}</h3>
            {description && (
              <p className="truncate text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {action ??
          (hideMenu ? null : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={`${title} options`}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="cursor-pointer">
                  <Download className="mr-2 size-4" />
                  Export data
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Share2 className="mr-2 size-4" />
                  Share panel
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Trash2 className="mr-2 size-4" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </header>

      <div className="min-h-0 grow">{children}</div>
    </section>
  );
}
