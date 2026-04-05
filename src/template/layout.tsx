'use client';

import { LayoutProvider } from '@/components/context';
import { DashboardLayout } from './DashboardLayout';
import { useEffect, useState } from 'react';
import { ScreenLoader } from '@/components/ScreenLoader';
import { MAIN_NAV } from '@/config/navitemsconfig';



export function Layout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ScreenLoader />;
    }

    return (
        <LayoutProvider sidebarNavItems={MAIN_NAV}>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </LayoutProvider>
    );
}