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

      <div className="flex flex-col grow">
        <Header/>
        <main
          className={cn(
            "grow  transition-all duration-300 ease-in-out",
            "min-h-[calc(100vh-70px)] mt-14",
            sidebarCollapse
              ? "lg:ml-20 lg:w-[calc(100vw-80px)]" 
              : "lg:ml-70 lg:w-[calc(100vw-280px)]"
          )}
          role="content"
        >
          {children}
        </main>
      </div>
    </>
  );
}
