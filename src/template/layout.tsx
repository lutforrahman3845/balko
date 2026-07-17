'use client';

import { LayoutProvider } from '@/config/context';
import { DashboardLayout } from './DashboardLayout';
import { useEffect, useState } from 'react';
import { ScreenLoader } from '@/components/ScreenLoader';
import { MAIN_NAV } from '@/config/navitemsconfig';
import { usePathname } from 'next/navigation';

export function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ScreenLoader />;
    }

    if (pathname?.startsWith('/sign-in')) {
        return <>{children}</>;
    }

    return (
        <LayoutProvider sidebarNavItems={MAIN_NAV}>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </LayoutProvider>
    );
}