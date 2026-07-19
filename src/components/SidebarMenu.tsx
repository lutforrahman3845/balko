"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/config/context";
import type { NavItem } from "@/@types/NavItem";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Quick "+" action revealed on row hover (expanded mode only). */
function QuickAdd({ to, tooltip }: { to: string; tooltip: string }) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Link href={to} onClick={(e) => e.stopPropagation()} aria-label={tooltip}>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 opacity-0 transition-opacity group-hover/row:opacity-100 focus-visible:opacity-100"
          >
            <Plus className="size-3.5" />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

const rowBase =
  "group/row flex h-10 items-center gap-2.5 rounded-lg px-3 text-[15px] font-medium transition-colors";
const rowActive = "bg-primary text-primary-foreground";
const rowIdle =
  "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

/** Collapsed rail: icon only, with a tooltip that also exposes sub-links. */
function CollapsedItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active =
    isActivePath(item.path, pathname) ||
    !!item.submenu?.some((s) => isActivePath(s.path, pathname));
  const Icon = item.icon;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.path}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex h-10 items-center justify-center rounded-lg",
            active ? rowActive : rowIdle,
          )}
        >
          <Icon className="size-5" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex flex-col gap-1">
        <span className="font-medium">{item.title}</span>
        {item.submenu?.map((sub) => (
          <Link
            key={sub.path}
            href={sub.path}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {sub.title}
          </Link>
        ))}
      </TooltipContent>
    </Tooltip>
  );
}

/** Expanded item: a link, or a disclosure that reveals its submenu. */
function ExpandedItem({
  item,
  pathname,
  open,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const active = isActivePath(item.path, pathname);
  const hasChildActive = !!item.submenu?.some((s) =>
    isActivePath(s.path, pathname),
  );

  if (item.haveSubmenu && item.submenu?.length) {
    return (
      <div>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className={cn(
            rowBase,
            "w-full",
            hasChildActive ? "text-foreground" : rowIdle,
          )}
        >
          <Icon className="size-5 shrink-0" />
          <span className="grow text-start">{item.title}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {/* Smooth height reveal via grid-rows, no library */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="mt-1 flex flex-col gap-0.5 ps-4">
              {item.submenu.map((sub) => {
                const subActive = isActivePath(sub.path, pathname);
                return (
                  <Link
                    key={sub.path}
                    href={sub.path}
                    aria-current={subActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      subActive ? rowActive : rowIdle,
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        subActive ? "bg-primary-foreground" : "bg-current",
                      )}
                    />
                    {sub.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(rowBase, active ? rowActive : rowIdle)}>
      <Link
        href={item.path}
        aria-current={active ? "page" : undefined}
        className="flex min-w-0 grow items-center gap-2.5"
      >
        <Icon className="size-5 shrink-0" />
        <span className="truncate">{item.title}</span>
      </Link>
      {item.new && <QuickAdd to={item.new.path} tooltip={item.new.tooltip} />}
    </div>
  );
}

interface SidebarMenuProps {
  /** Render expanded regardless of the collapse preference (mobile sheet). */
  forceExpanded?: boolean;
  /** Render as an icon rail regardless of the collapse preference. */
  forceCollapsed?: boolean;
}

export function SidebarMenu({
  forceExpanded = false,
  forceCollapsed = false,
}: SidebarMenuProps) {
  const { getSidebarNavSections, sidebarCollapse } = useLayout();
  const pathname = usePathname();
  const sections = getSidebarNavSections();
  const collapsed = forceCollapsed || (sidebarCollapse && !forceExpanded);

  // Which submenu is open (single-open accordion), seeded from the active route.
  const [openPath, setOpenPath] = useState<string | null>(() => {
    const active = sections
      .flatMap((section) => section.items)
      .find((item) => item.submenu?.some((s) => isActivePath(s.path, pathname)));
    return active?.path ?? null;
  });

  return (
    <nav
      aria-label="Main"
      className={cn("flex flex-col", collapsed ? "gap-3 px-2" : "gap-5 px-3")}
    >
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          {collapsed ? (
            // A hairline stands in for the heading so the grouping survives
            // the rail without a label to carry it.
            <span aria-hidden className="mx-auto my-1 h-px w-6 bg-border" />
          ) : (
            <h2 className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-sidebar-foreground/45 uppercase">
              {section.title}
            </h2>
          )}

          {section.items.map((item) =>
            collapsed ? (
              <CollapsedItem key={item.path} item={item} pathname={pathname} />
            ) : (
              <ExpandedItem
                key={item.path}
                item={item}
                pathname={pathname}
                open={openPath === item.path}
                onToggle={() =>
                  setOpenPath((p) => (p === item.path ? null : item.path))
                }
              />
            ),
          )}
        </div>
      ))}
    </nav>
  );
}
