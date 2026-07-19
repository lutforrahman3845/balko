"use client";

import { Check, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LAYOUT_VARIANTS } from "@/@types/layout";
import { useLayout } from "@/config/context";
import { cn } from "@/lib/utils";

/**
 * Switches the app shell. Hidden below the desktop breakpoint because every
 * variant collapses to the same mobile presentation, so the choice would have
 * no visible effect there.
 */
export function LayoutSwitcher() {
  const { layoutVariant, setLayoutVariant } = useLayout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hidden size-9 hover:bg-primary/10 hover:[&_svg]:text-primary lg:inline-flex"
          aria-label="Change layout"
        >
          <LayoutPanelLeft className="size-4.5!" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Layout
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {LAYOUT_VARIANTS.map((variant) => {
          const selected = variant.value === layoutVariant;

          return (
            <DropdownMenuItem
              key={variant.value}
              onSelect={() => setLayoutVariant(variant.value)}
              className="flex flex-col items-start gap-0.5 py-2"
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-sm", selected && "font-medium")}>
                  {variant.label}
                </span>
                {selected && <Check className="size-4 text-primary" />}
              </span>
              <span className="text-xs text-muted-foreground">
                {variant.description}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
