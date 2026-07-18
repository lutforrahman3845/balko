import { ReactNode } from "react";
import {
  Moon,
  UserCircle,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

export function UserDropdownMenu({ trigger }: { trigger: ReactNode }) {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side="bottom" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Image
              src={"/avatars/avatar-4.jpg"}
              alt="User avatar"
              height={200}
              width={200}
              className="size-9 rounded-full border-2 border-green-500"
            />
            <div className="flex flex-col">
              <Link
                href="#"
                className="text-sm text-mono hover:text-primary font-semibold"
              >
                Jon Snow
              </Link>
              <a
                href={`mailto:sean@kt.com`}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                ceo@balko.com
              </a>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2">
            <UserCircle className="size-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2">
            <Calendar className="size-4" />
            Calendar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2">
            <Settings className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="#" className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            Help & Support
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Footer */}
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => event.preventDefault()}
        >
          <Moon />
          <div className="flex items-center gap-2 justify-between grow">
            Dark Mode
            <Switch
              size="sm"
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </DropdownMenuItem>
        <Link href="/sign-in" className="p-2 mt-1">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <LogOut className="size-4" />
            Logout
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
