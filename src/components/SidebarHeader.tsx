"use client";

import { ChevronsLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/config/context";
import Link from "next/link";
import Image from "next/image";

export function SidebarHeader() {
  const { sidebarCollapse, setSidebarCollapse } = useLayout();

  return (
    <div className="relative flex h-16 shrink-0 items-center px-3">
      <Link href="/" className="flex min-w-0 items-center overflow-hidden">
        {sidebarCollapse ? (
          <>
            <Image
              width={32}
              height={32}
              src="/logo/balcowhite.svg"
              className="size-8 max-w-none dark:hidden"
              alt="Balko"
            />
            <Image
              width={32}
              height={32}
              src="/logo/balcoblack.svg"
              className="hidden size-8 max-w-none dark:block"
              alt="Balko"
            />
          </>
        ) : (
          <>
            <Image
              width={160}
              height={48}
              src="/logo/balcofullwhite.svg"
              className="h-11 w-auto max-w-none dark:hidden"
              alt="Balko"
            />
            <Image
              width={160}
              height={48}
              src="/logo/balcofullblack.svg"
              className="hidden h-11 w-auto max-w-none dark:block"
              alt="Balko"
            />
          </>
        )}
      </Link>

      {/* Collapse toggle pinned to the sidebar's inline-end edge */}
      <Button
        onClick={() => setSidebarCollapse(!sidebarCollapse)}
        size="icon"
        variant="outline"
        aria-label={sidebarCollapse ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute inset-s-full top-1/2 z-10 size-7 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-sm rtl:translate-x-1/2"
      >
        <ChevronsLeft
          className={cn("size-4 transition-transform duration-300", sidebarCollapse && "rotate-180")}
        />
      </Button>
    </div>
  );
}
