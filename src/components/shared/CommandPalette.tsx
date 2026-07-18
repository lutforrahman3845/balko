"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutGrid,
  CheckSquare,
  Contact,
  Building2,
  UserCircle,
  Users,
  Briefcase,
  FolderTree,
  BarChart3,
  Calendar,
  MessageSquare,
  Component,
  Settings,
  Moon,
  Sun,
  Plus,
} from "lucide-react";

const PAGES = [
  { label: "Dashboard", path: "/", icon: LayoutGrid },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Tasks", path: "/tasks", icon: CheckSquare },
  { label: "Calendar", path: "/calendar", icon: Calendar },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Contacts", path: "/contacts", icon: Contact },
  { label: "Companies", path: "/companies", icon: Building2 },
  { label: "Employees", path: "/employees", icon: UserCircle },
  { label: "Teams", path: "/teams", icon: Users },
  { label: "Projects", path: "/projects", icon: Briefcase },
  { label: "Folders", path: "/folders", icon: FolderTree },
  { label: "UI Kit", path: "/ui-kit", icon: Component },
  { label: "Settings", path: "/account/settings", icon: Settings },
  { label: "My Profile", path: "/account/profile", icon: UserCircle },
];

const QUICK_ACTIONS = [
  { label: "New Contact", path: "/contacts/new", icon: Plus },
  { label: "New Company", path: "/companies/new", icon: Plus },
  { label: "New Project", path: "/projects/new", icon: Plus },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const openEvent = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openEvent);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openEvent);
    };
  }, []);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {PAGES.map((item) => (
            <CommandItem
              key={item.path}
              value={item.label}
              onSelect={() => go(item.path)}
            >
              <item.icon />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick actions">
          {QUICK_ACTIONS.map((item) => (
            <CommandItem
              key={item.path}
              value={item.label}
              onSelect={() => go(item.path)}
            >
              <item.icon />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            value="Toggle theme"
            onSelect={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            Toggle theme
            <CommandShortcut>⌘K to open</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
