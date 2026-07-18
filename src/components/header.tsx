import { startTransition, useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { UserDropdownMenu } from "./UserDropdownMenu";
import Image from "next/image";
import { Notifications } from "./notifications";

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [use12HourFormat, setUse12HourFormat] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const pathname = usePathname();
  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;

  // Close sheet when route changes
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
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 items-stretch shrink-0 border-b border-border bg-background pe-(--removed-body-scroll-bar-size,0px)",
        headerSticky && "",
      )}
    >
      <div className="flex justify-between items-stretch lg:gap-4 px-4 w-full">
        {/* HeaderLogo - Always present for justify-between to work */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="shrink-0 lg:hidden">
            <div className="dark:hidden flex items-center">
              <Image
                width={200}
                height={200}
                src="/avatars/avatar-4.jpg"
                alt="logo"
                className="h-9 w-9 transition-transform group-hover:rotate-12"
              />
            </div>
            <div className="hidden dark:flex items-center">
              <Image
                width={200}
                height={200}
                src="/avatars/avatar-4.jpg"
                alt="logo"
                className="h-9 w-9  transition-transform group-hover:rotate-12"
              />
            </div>
          </Link>
          <div className="flex items-center lg:hidden">
            {mobileMode && (
              <Sheet
                open={isSidebarSheetOpen}
                onOpenChange={setIsSidebarSheetOpen}
              >
                {mobileMode && (
                  <Sheet
                    open={isSidebarSheetOpen}
                    onOpenChange={setIsSidebarSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost">
                        <Menu className="text-muted-foreground/70 size-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className="p-0 gap-0 w-68.75"
                      side="left"
                      close={false}
                    >
                      <SheetHeader className="p-0 space-y-0" />
                      <SheetBody className="p-0 overflow-y-auto">
                        <SidebarMenu forceExpanded />
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
              </Sheet>
            )}
          </div>
        </div>

        {/* HeaderTopbar */}
        <div className="flex items-center gap-3">
          {/* Command palette trigger */}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
            className="hidden sm:flex items-center gap-2 h-9 rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Search className="size-4" />
            <span>Search...</span>
            <kbd className="ml-2 hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </button>
          <Button
            variant="ghost"
            className="size-9 sm:hidden hover:bg-primary/10 hover:[&_svg]:text-primary"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <Search className="size-4.5!" />
          </Button>

          {/* Real-time Date/Time Display */}
          <div
            className="hidden md:flex items-center px-3 py-1.5 rounded-md  cursor-pointer"
            onClick={() => setUse12HourFormat((prev) => !prev)}
            title="Click to toggle time format"
          >
            <span className="text-sm font-medium text-foreground/80">
              {currentDateTime}
            </span>
          </div>
          <Notifications
            trigger={
              <Button
                variant="ghost"
                className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
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
                className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer"
                src={"/avatars/avatar-4.jpg"}
                alt="User Avatar"
              />
            }
          />
        </div>
      </div>
    </header>
  );
}
