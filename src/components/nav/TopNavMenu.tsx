"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLayout } from "@/config/context";
import { isActivePath, isItemActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Horizontal navigation for the top-nav shell. Sections become menus; a
 * section with a single item links straight to it rather than opening a
 * one-entry dropdown.
 */
export function TopNavMenu() {
  const { getSidebarNavSections } = useLayout();
  const pathname = usePathname();
  const sections = getSidebarNavSections();

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-1 overflow-x-auto px-4 lg:flex"
    >
      {sections.map((section) => {
        const sectionActive = section.items.some((item) =>
          isItemActive(item, pathname),
        );

        return (
          <DropdownMenu key={section.title}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-11 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 text-sm font-medium transition-colors",
                  sectionActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <section.icon className="size-4" />
                {section.title}
                <ChevronDown className="size-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {section.title}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {section.items.map((item) => (
                <div key={item.path}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center gap-2.5",
                        isActivePath(item.path, pathname) &&
                          "text-primary font-medium",
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.title}
                    </Link>
                  </DropdownMenuItem>

                  {item.submenu?.map((sub) => (
                    <DropdownMenuItem key={sub.path} asChild>
                      <Link
                        href={sub.path}
                        className={cn(
                          "ps-9 text-sm",
                          isActivePath(sub.path, pathname)
                            ? "text-primary font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        {sub.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
}
