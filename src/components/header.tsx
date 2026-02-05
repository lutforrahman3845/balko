import { startTransition, useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
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
import { SidebarMenu } from "./sidebar-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { UserDropdownMenu } from "./user-dropdown-menu";
import Image from "next/image";
import { Notifications } from "./notifications";

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-(--removed-body-scroll-bar-size,0px)",
        headerSticky && "border-b border-border",
      )}
    >
      <div className="container-fluid flex justify-between items-stretch lg:gap-4 px-4 w-full">
        {/* HeaderLogo - Always present for justify-between to work */}
        <div className="flex items-center gap-2.5">
          <Link href="/" className="shrink-0 lg:hidden">
            <Image
              height={200}
              width={200}
              src={"/favicon.svg"}
              className="h-9 w-full"
              alt="mini-logo"
            />
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
                        <SidebarMenu />
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
                src={"/avatars/300-8.png"}
                alt="User Avatar"
              />
            }
          />
        </div>
      </div>
    </header>
  );
}
