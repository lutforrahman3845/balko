"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useLayout } from "@/config/context";
import { cn } from "@/lib/utils";

/**
 * Default shell: a fixed navigation column with a content area whose
 * inline-start margin follows the sidebar width.
 */
export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapse, layoutReady } = useLayout();

  return (
    <>
      <Sidebar />
      <div
        className={cn(
          "flex min-w-0 grow flex-col",
          // Suppress the slide until the stored preference has been applied,
          // otherwise the sidebar animates open on every page load.
          layoutReady && "transition-[margin] duration-200 ease-out",
          sidebarCollapse ? "lg:ms-18" : "lg:ms-64",
        )}
      >
        <Header />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
