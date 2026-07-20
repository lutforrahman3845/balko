"use client";

import { startTransition, useEffect, useState, type ReactNode } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarMenu } from "./SidebarMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserDropdownMenu } from "./UserDropdownMenu";
import Image from "next/image";
import { Notifications } from "./notifications";
import { LayoutSwitcher } from "./shared/LayoutSwitcher";

interface HeaderProps {
  /**
   * Show the wordmark at every breakpoint. Shells that carry their own brand
   * (sidebar, rail, two-column) leave this off so it is not shown twice.
   */
  alwaysShowBrand?: boolean;
  /** Secondary row under the header bar — used by the top-nav shell. */
  bottomRow?: ReactNode;
}

export function Header({ alwaysShowBrand = false, bottomRow }: HeaderProps) {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [use12HourFormat, setUse12HourFormat] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const pathname = usePathname();

  // Close the mobile nav when the route changes.
  useEffect(() => {
    startTransition(() => {
      setIsSidebarSheetOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-BD", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: use12HourFormat,
        timeZone: "Asia/Dhaka",
      });
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [use12HourFormat]);

  return (
    <header className="sticky top-0 z-20 flex shrink-0 flex-col border-b border-border bg-background">
      <div className="flex h-16 w-full items-stretch justify-between px-4 lg:gap-4">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className={cn("shrink-0", !alwaysShowBrand && "lg:hidden")}
          >
            <span className="flex items-center dark:hidden">
              <Image
                width={200}
                height={200}
                src="/logo/balcowhite.svg"
                alt="Balko"
                className="h-9 w-9"
              />
            </span>
            <span className="hidden items-center dark:flex">
              <Image
                width={200}
                height={200}
                src="/logo/balcoblack.svg"
                alt="Balko"
                className="h-9 w-9"
              />
            </span>
          </Link>

          <Sheet open={isSidebarSheetOpen} onOpenChange={setIsSidebarSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-6 text-muted-foreground/70" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-68.75 gap-0 p-0" side="left" close={false}>
              <SheetHeader className="space-y-0 p-0" />
              <SheetBody className="overflow-y-auto p-0">
                <SidebarMenu forceExpanded />
              </SheetBody>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:flex"
          >
            <Search className="size-4" />
            <span>Search...</span>
            <kbd className="ml-2 hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground lg:inline-flex">
              ⌘K
            </kbd>
          </button>
          <Button
            variant="ghost"
            className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary sm:hidden"
            aria-label="Search"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <Search className="size-4.5!" />
          </Button>

          <button
            type="button"
            className="hidden cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 md:block"
            onClick={() => setUse12HourFormat((prev) => !prev)}
            title="Switch between 12- and 24-hour time"
          >
            {currentDateTime}
          </button>

          <LayoutSwitcher />

          <Notifications
            trigger={
              <Button
                variant="ghost"
                className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                aria-label="Notifications"
              >
                <Bell className="size-4.5!" />
              </Button>
            }
          />
          <UserDropdownMenu
            trigger={
              <Image
                height={200}
                width={200}
                className="size-9 shrink-0 cursor-pointer rounded-full border-2 border-border"
                src={"/avatars/avatar-4.jpg"}
                alt="User Avatar"
              />
            }
          />
        </div>
      </div>

      {bottomRow}
    </header>
  );
}
