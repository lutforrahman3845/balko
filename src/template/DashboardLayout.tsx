"use client";

import { useLayout } from "@/config/context";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { SidebarLayout } from "./layouts/SidebarLayout";
import { RailLayout } from "./layouts/RailLayout";
import { TopNavLayout } from "./layouts/TopNavLayout";
import { TwoColumnLayout } from "./layouts/TwoColumnLayout";
import type { LayoutVariant } from "@/@types/layout";

const SHELLS: Record<
  LayoutVariant,
  (props: { children: React.ReactNode }) => React.ReactNode
> = {
  sidebar: SidebarLayout,
  rail: RailLayout,
  topnav: TopNavLayout,
  twocolumn: TwoColumnLayout,
};

/**
 * Picks the app shell. Each shell owns its own navigation chrome; every one of
 * them hides that chrome below the desktop breakpoint and falls back to the
 * header's navigation sheet, so pages need no per-shell handling.
 *
 * Visibility is CSS-driven rather than gated on a viewport hook, so the first
 * paint is already correct on mobile.
 */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { layoutVariant } = useLayout();
  const Shell = SHELLS[layoutVariant] ?? SidebarLayout;

  return (
    <div className="flex min-h-screen bg-background">
      <CommandPalette />
      <Shell>{children}</Shell>
    </div>
  );
}
