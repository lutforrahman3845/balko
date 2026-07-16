"use client";

import { cn } from "@/lib/utils";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import { useLayout } from "@/config/context";

export function Sidebar() {
  const { sidebarCollapse } = useLayout();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 inset-s-0 z-30 hidden flex-col border-e border-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out lg:flex",
        sidebarCollapse ? "w-18" : "w-64",
      )}
    >
      <SidebarHeader />
      <div className="min-h-0 grow overflow-x-hidden overflow-y-auto py-3">
        <SidebarMenu />
      </div>
    </aside>
  );
}
