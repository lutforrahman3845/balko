"use client";

import { Check, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LAYOUT_VARIANTS, type LayoutVariant } from "@/@types/layout";
import { useLayout } from "@/config/context";
import { cn } from "@/lib/utils";

function ShellPreview({
  variant,
  selected,
}: {
  variant: LayoutVariant;
  selected: boolean;
}) {
  const nav = cn(
    "rounded-xs transition-colors",
    selected ? "bg-primary" : "bg-muted-foreground/30",
  );
  const body = "rounded-xs bg-muted-foreground/15";

  const page = (
    <div className="flex flex-1 flex-col gap-1">
      <div className={cn(body, "h-1/4")} />
      <div className={cn(body, "flex-1")} />
    </div>
  );

  return (
    <div className="flex aspect-4/3 w-full gap-1 rounded-md border border-border bg-muted/40 p-1">
      {variant === "sidebar" && (
        <>
          <div className={cn(nav, "w-1/3")} />
          {page}
        </>
      )}

      {variant === "rail" && (
        <>
          <div className={cn(nav, "w-[15%]")} />
          {page}
        </>
      )}

      {variant === "topnav" && (
        <div className="flex flex-1 flex-col gap-1">
          <div className={cn(nav, "h-1/5")} />
          {page}
        </div>
      )}

      {variant === "twocolumn" && (
        <>
          <div className={cn(nav, "w-[15%]")} />
          <div className={cn(nav, "w-1/4 opacity-60")} />
          {page}
        </>
      )}
    </div>
  );
}

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

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Layout
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={layoutVariant}
          onValueChange={(value) => setLayoutVariant(value as LayoutVariant)}
          className="grid grid-cols-2 gap-1"
        >
          {LAYOUT_VARIANTS.map((variant) => {
            const selected = variant.value === layoutVariant;

            return (
              <DropdownMenuRadioItem
                key={variant.value}
                value={variant.value}
                // The base item reserves inline-start space for a radio dot and
                // renders it as its first child; both are replaced here by the
                // preview tile and its corner tick.
                className="flex-col items-stretch gap-1.5 p-1.5 ps-1.5 [&>span:first-child]:hidden"
                title={variant.description}
              >
                <span className="relative block">
                  <ShellPreview variant={variant.value} selected={selected} />
                  {selected && (
                    <span className="absolute -top-1 -inset-e-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-center text-xs",
                    selected ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {variant.label}
                </span>
                <span className="sr-only">{variant.description}</span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
