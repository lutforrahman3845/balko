"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useLayout } from "@/config/context";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { cn } from "@/lib/utils";

// Original app shell: a fixed sidebar rail plus a content column whose
// inline-start margin follows the sidebar width. State-driven only — no
// global body classes, no external layout CSS.
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { sidebarCollapse } = useLayout();

  return (
    <div className="flex min-h-screen bg-background">
      <CommandPalette />
      {!isMobile && <Sidebar />}

      <div
        className={cn(
          "flex min-w-0 grow flex-col transition-[margin] duration-300 ease-in-out",
          sidebarCollapse ? "lg:ms-18" : "lg:ms-64",
        )}
      >
        <Header />
        <main className="grow">{children}</main>
      </div>
    </div>
  );
}
