"use client";

import { cn } from "@/lib/utils";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import { useLayout } from "@/config/context";

interface SidebarProps {
  /** Pin to the icon rail width, ignoring the collapse preference. */
  forceCollapsed?: boolean;
}

export function Sidebar({ forceCollapsed = false }: SidebarProps) {
  const { sidebarCollapse, layoutReady } = useLayout();
  const collapsed = forceCollapsed || sidebarCollapse;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 inset-s-0 z-30 hidden flex-col border-e border-border bg-sidebar text-sidebar-foreground lg:flex",
        layoutReady && "transition-[width] duration-200 ease-out",
        collapsed ? "w-18" : "w-64",
      )}
    >
      <SidebarHeader collapsed={collapsed} showToggle={!forceCollapsed} />
      <div className="min-h-0 grow overflow-x-hidden overflow-y-auto py-3">
        <SidebarMenu forceCollapsed={forceCollapsed} />
      </div>
    </aside>
  );
}
