"use client";

import { Header } from "@/components/header";
import { TopNavMenu } from "@/components/nav/TopNavMenu";

/**
 * Horizontal navigation in a second header row. Nothing is reserved at the
 * inline start, so content gets the full viewport width — the trade is that
 * every section costs a click through a dropdown.
 */
export function TopNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 grow flex-col">
      <Header alwaysShowBrand bottomRow={<TopNavMenu />} />
      <main className="grow">{children}</main>
    </div>
  );
}
