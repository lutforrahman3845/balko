
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  AccordionMenu,
  AccordionMenuItem,
} from '@/components/ui/accordion-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLayout } from './context';
import type { NavItem } from '@/@types/NavItem';
import { cn } from '@/lib/utils';


function NavItem({ item }: { item: NavItem }) {


  let mainContent: React.ReactNode = null;
  if (item.path) {
    mainContent = (
      <Link
        href={item.path}
        className="flex items-center grow gap-2.5 font-medium"
      >
        {item.icon && <item.icon className='size-5' />}
        <span className='text-[15px]'>{item.title}</span>
      </Link>
    );
  } else {
    mainContent = (
      <div className="flex items-center grow gap-2.5 font-medium">
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </div>
    );
  }

  return (
    <>
      {mainContent}
      {item.new && (
        <div className="opacity-0 flex items-center gap-1 group-hover:opacity-100 [&:has([data-state=open])]:opacity-100">
          {item.new && (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-6 hover:bg-input"
                  size="icon"
                >
                  <Link href={item.new.path}>
                    <Plus className="size-4 dark:text-white " />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={2}>
                {item.new.tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
    </>
  );
}

function NavItemCollapsed({ item }: { item: NavItem }) {

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center w-full">
          {item.path ? (
            <Link href={item.path} className="flex items-center justify-center size-9 rounded-md transition-colors hover:bg-accent group-data-[active=true]:bg-accent">
              {item.icon && <item.icon className="size-5" />}
            </Link>
          ) : (
            <div className="flex items-center justify-center size-9 rounded-md">
              {item.icon && <item.icon className="size-5" />}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent align="center" side="right" sideOffset={14}>
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
}

export function SidebarMenu() {
  const pathname = usePathname();
  const { getSidebarNavItems, sidebarCollapse } = useLayout();
  const navItems = getSidebarNavItems();
  const matchPath = (path: string) =>
    path === pathname || (path.length > 1 && pathname.startsWith(path));

  return (
    <div className={cn("pt-4", sidebarCollapse ? "px-2" : "px-4")}>
      <AccordionMenu
        type="single"
        matchPath={matchPath}
        classNames={{
          root: 'grow space-y-1.5 shrink-0',
          item: 'group py-0 h-10 [&:has([data-state=open])]:bg-accent/50 justify-between cursor-pointer rounded-md transition-colors',
        }}
        collapsible
      >
        {navItems.map((item) => (
          <AccordionMenuItem key={item.id} asChild value={item.path || item.id}>
            <div className="px-5">
              {sidebarCollapse ? (
                <NavItemCollapsed item={item} />
              ) : (
                <NavItem item={item} />
              )}
            </div>
          </AccordionMenuItem>
        ))}
      </AccordionMenu>
    </div>
  );
}
