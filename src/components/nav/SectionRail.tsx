"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLayout } from "@/config/context";
import { isItemActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Narrow rail of section glyphs, used by the two-column shell. Selecting a
 * section navigates to its first page; the adjacent page menu then lists the
 * rest of that section.
 */
export function SectionRail() {
  const { getSidebarNavSections } = useLayout();
  const pathname = usePathname();
  const sections = getSidebarNavSections();

  return (
    <div className="flex h-full w-16 flex-col items-center border-e border-border bg-sidebar py-3">
      <Link href="/" className="mb-4 flex size-10 items-center justify-center">
        <span className="dark:hidden">
          <Image
            src="/logo/balcowhite.svg"
            alt="Balko"
            width={36}
            height={36}
            className="size-8"
          />
        </span>
        <span className="hidden dark:block">
          <Image
            src="/logo/balcoblack.svg"
            alt="Balko"
            width={36}
            height={36}
            className="size-8"
          />
        </span>
      </Link>

      <nav aria-label="Sections" className="flex flex-col gap-1">
        {sections.map((section) => {
          const active = section.items.some((item) =>
            isItemActive(item, pathname),
          );

          return (
            <Tooltip key={section.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={section.items[0].path}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <section.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{section.title}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </div>
  );
}
