"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "@/config/context";
import { findActiveSection, isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Page menu for the current section — the second column of the two-column
 * shell. It only ever lists one section, which is what keeps that shell
 * readable as the app grows.
 */
export function SectionPageMenu() {
  const { getSidebarNavSections } = useLayout();
  const pathname = usePathname();
  const section = findActiveSection(getSidebarNavSections(), pathname);

  return (
    <div className="flex h-full w-56 flex-col border-e border-border bg-sidebar">
      <div className="flex h-16 items-center px-4">
        <h2 className="text-sm font-semibold tracking-tight text-sidebar-accent-foreground">
          {section.title}
        </h2>
      </div>

      <nav aria-label={section.title} className="flex flex-col gap-0.5 px-3">
        {section.items.map((item) => {
          const active = isActivePath(item.path, pathname);

          return (
            <div key={item.path}>
              <Link
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate">{item.title}</span>
              </Link>

              {item.submenu?.length ? (
                <div className="mt-0.5 flex flex-col gap-0.5 ps-6">
                  {item.submenu.map((sub) => {
                    const subActive = isActivePath(sub.path, pathname);
                    return (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        aria-current={subActive ? "page" : undefined}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-sm transition-colors",
                          subActive
                            ? "text-primary font-medium"
                            : "text-sidebar-foreground/60 hover:text-sidebar-accent-foreground",
                        )}
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
