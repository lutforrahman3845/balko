
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  AccordionMenu,
  AccordionMenuItem,
  AccordionMenuSub,
  AccordionMenuSubContent,
  AccordionMenuSubTrigger,
} from '@/components/ui/accordion-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLayout } from '../config/context';
import type { NavItem } from '@/@types/NavItem';
import { cn } from '@/lib/utils';


function NavItemContent({
  item,
  isTrigger,
}: {
  item: NavItem;
  isTrigger?: boolean;
}) {
  let mainContent: React.ReactNode = null;
  if (item.path && !isTrigger) {
    mainContent = (
      <Link
        href={item.path}
        className="flex items-center grow gap-0.5 font-medium"
      >
        {item.icon && <item.icon className="size-5" />}
        <span className="text-[15px]">{item.title}</span>
      </Link>
    );
  } else {
    mainContent = (
      <div className="flex items-center grow gap-2.5 font-medium">
        {item.icon && <item.icon className="size-5" />}
        <span className="text-[15px]">{item.title}</span>
      </div>
    );
  }

  return (
    <>
      {mainContent}
      {item.new && (
        <div className="opacity-0 flex items-center gap-1 group-hover:opacity-100 [&:has([data-state=open])]:opacity-100">
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <Link href={item.new.path}>
                <Button
                  variant="ghost"
                  className="size-6 hover:bg-input"
                  size="icon"
                >
                  <Plus className="size-4 dark:text-white " />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent align="center" side="right" sideOffset={2}>
              {item.new.tooltip}
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
}

function NavItemCollapsed({
  item,
  isTrigger,
}: {
  item: NavItem;
  isTrigger?: boolean;
}) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {item.path && !isTrigger ? (
          <Link
            href={item.path}
            className="flex items-center justify-center w-full h-full"
          >
            <div className="flex items-center justify-center size-9 rounded-md transition-colors">
              {item.icon && <item.icon className="size-5" />}
            </div>
          </Link>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex items-center justify-center size-9 rounded-md">
              {item.icon && <item.icon className="size-5" />}
            </div>
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent align="center" side="right" sideOffset={14}>
        {item.haveSubmenu && item.submenu ? (
          <div className="flex flex-col gap-1.5 min-w-32">
            {item.submenu.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.path}
                className="text-xs py-0.5 text-white dark:text-black transition-colors"
              >
                {sub.title}
              </Link>
            ))}
          </div>
        ) : (
          item.title
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavItem({
  item,
  sidebarCollapse,
}: {
  item: NavItem;
  sidebarCollapse: boolean;
}) {
  const pathname = usePathname();
  const matchPath = (path: string) =>
    path === pathname || (path.length > 1 && pathname.startsWith(path));

  const isActive = matchPath(item.path);
  const isParent = item.haveSubmenu && item.submenu && !sidebarCollapse;

  const activeClass = isActive
    ? (isParent 
        ? "text-zinc-900 dark:text-zinc-100 font-semibold bg-zinc-300/60 dark:bg-zinc-800/60" 
        : "bg-[#252525] dark:bg-white text-white dark:text-black font-medium")
    : "text-zinc-900 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800";

  if (isParent) {
    return (
      <AccordionMenuSub value={item.path}>
        <AccordionMenuSubTrigger className={cn("px-4 rounded-md transition-all h-11 border-0", activeClass)}>
          <NavItemContent item={item} isTrigger />
        </AccordionMenuSubTrigger>
        <AccordionMenuSubContent
          type="single"
          collapsible
          parentValue={item.path}
        >
          {item?.submenu?.map((sub, sIdx) => {
            const isSubActive = matchPath(sub.path);
            return (
              <AccordionMenuItem key={sIdx} asChild value={sub.path}>
                <Link
                  href={sub.path}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all rounded-md mt-1",
                    isSubActive
                      ? "text-white dark:text-black bg-[#252525] dark:bg-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={cn("size-1.5 rounded-full", isSubActive ? "bg-white dark:bg-black" : "bg-current")} />
                    <span>{sub.title}</span>
                  </div>
                </Link>
              </AccordionMenuItem>
            );
          })}
        </AccordionMenuSubContent>
      </AccordionMenuSub>
    );
  }

  return (
    <AccordionMenuItem asChild value={item.path}>
      <div className={cn("px-4 rounded-md transition-all h-11 w-full flex items-center my-0.5", activeClass)}>
        {sidebarCollapse ? (
          <NavItemCollapsed item={item} />
        ) : (
          <NavItemContent item={item} />
        )}
      </div>
    </AccordionMenuItem>
  );
}

export function SidebarMenu() {
  const { getSidebarNavItems, sidebarCollapse } = useLayout();
  const navItems = getSidebarNavItems();

  return (
    <div className={cn("pt-4", sidebarCollapse ? "px-2" : "px-4")}>
      <AccordionMenu
        type="single"
        classNames={{
          root: "grow  shrink-0",
          item: "group py-0 justify-between cursor-pointer rounded-md transition-colors",
        }}
        collapsible
      >
        {navItems.map((item, idx) => (
          <NavItem key={idx} item={item} sidebarCollapse={sidebarCollapse} />
        ))}
      </AccordionMenu>
    </div>
  );
}
