import { useEffect } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useLayout } from "@/components/context";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { sidebarCollapse } = useLayout();

  useEffect(() => {
    const bodyClass = document.body.classList;

    if (sidebarCollapse) {
      bodyClass.add("sidebar-collapse");
    } else {
      bodyClass.remove("sidebar-collapse");
    }
  }, [sidebarCollapse]);

  useEffect(() => {
    const bodyClass = document.body.classList;

    bodyClass.add("demo1");
    bodyClass.add("sidebar-fixed");
    bodyClass.add("header-fixed");

    const timer = setTimeout(() => {
      bodyClass.add("layout-initialized");
    }, 1000);

    return () => {
      bodyClass.remove("demo1");
      bodyClass.remove("sidebar-fixed");
      bodyClass.remove("sidebar-collapse");
      bodyClass.remove("header-fixed");
      bodyClass.remove("layout-initialized");
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!isMobile && <Sidebar />}

      <div className="wrapper flex grow flex-col">
        <Header />

        <main
          className={cn(
            "grow  transition-all duration-300 ease-in-out px-4",
            sidebarCollapse ? "container-fluid px-4" : "container mx-auto",
          )}
          role="content"
        >
          {children}
        </main>

        {/* <Footer /> */}
      </div>
    </>
  );
}
