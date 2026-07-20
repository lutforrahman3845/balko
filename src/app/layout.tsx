import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from "react";
import { Layout } from "@/template/layout";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balko - Project Management System",
  description: "Streamline your projects, manage tasks, and ensure milestones are met with Balko.",
  icons:{
    icon:"/favicon.svg"
  }
};
import StoreProvider from "@/providers/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
      >
        <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              storageKey="nextjs-theme"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <TooltipProvider delayDuration={0}>
                <Suspense>
                  <Layout>{children}  </Layout>
                </Suspense>
                <Toaster />
              </TooltipProvider>
            </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
