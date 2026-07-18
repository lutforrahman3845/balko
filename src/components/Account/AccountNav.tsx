"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/account/profile", label: "Profile", icon: UserCircle },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <nav className="flex gap-1 -mb-px">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
