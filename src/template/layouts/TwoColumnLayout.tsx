"use client";

import { Header } from "@/components/header";
import { SectionRail } from "@/components/nav/SectionRail";
import { SectionPageMenu } from "@/components/nav/SectionPageMenu";

/**
 * Section rail plus a page menu scoped to the active section. The second
 * column only ever lists one section, so navigation stays a constant size no
 * matter how many pages the app grows to.
 */
export function TwoColumnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-y-0 inset-s-0 z-30 hidden lg:flex">
        <SectionRail />
        <SectionPageMenu />
      </div>

      <div className="flex min-w-0 grow flex-col lg:ms-72">
        <Header />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
