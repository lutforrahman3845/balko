import { cn } from '@/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenu } from './SidebarMenu';
import { usePathname } from 'next/navigation';
import { useLayout } from '../config/context';

export function Sidebar() {

  const pathname = usePathname();
  const { sidebarTheme } = useLayout();
  return (
    <div
      className={cn(
        'sidebar bg-background lg:border-e lg:border-border lg:fixed lg:top-0 lg:bottom-0 lg:z-20 lg:flex flex-col items-stretch shrink-0',
        (sidebarTheme === 'dark' || pathname.includes('dark-sidebar')) &&
        'dark',
      )}
    >
      <SidebarHeader />
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div>
          <SidebarMenu />
        </div>
      </div>
    </div>
  );
}
