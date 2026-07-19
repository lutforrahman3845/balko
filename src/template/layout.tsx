'use client';

import { LayoutProvider } from '@/config/context';
import { DashboardLayout } from './DashboardLayout';
import { useEffect, useState } from 'react';
import { ScreenLoader } from '@/components/ScreenLoader';
import { MAIN_NAV, MAIN_NAV_SECTIONS } from '@/config/navitemsconfig';
import { usePathname } from 'next/navigation';

// Routes rendered without the dashboard shell (auth flow + marketing pages).
const BARE_ROUTES = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/lock-screen',
    '/landing',
    '/pricing',
];

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

    if (BARE_ROUTES.some((route) => pathname?.startsWith(route))) {
        return <>{children}</>;
    }

    return (
        <LayoutProvider
            sidebarNavItems={MAIN_NAV}
            sidebarNavSections={MAIN_NAV_SECTIONS}
        >
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </LayoutProvider>
    );
}