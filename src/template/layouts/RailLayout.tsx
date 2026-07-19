"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

/**
 * Icon-only navigation pinned at rail width. Labels live in tooltips, which
 * buys back ~11rem of content width — the reason to pick this shell is wide
 * tables and boards.
 */
export function RailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar forceCollapsed />
      <div className="flex min-w-0 grow flex-col lg:ms-18">
        <Header />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
