import { NavConfig } from "@/@types/NavItem";
import { useIsMobile } from "@/hooks/use-mobile";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type SidebarTheme = "dark" | "light";

// Define the shape of the layout state
interface LayoutState {
  sidebarCollapse: boolean;
  setSidebarCollapse: (open: boolean) => void;
  sidebarTheme: SidebarTheme;
  setSidebarTheme: (theme: SidebarTheme) => void;
  pinSidebarNavItem: (id: string) => void;
  unpinSidebarNavItem: (id: string) => void;
  isSidebarNavItemPinned: (id: string) => boolean;
  getSidebarNavItems: () => NavConfig;
}

// Create the context
const LayoutContext = createContext<LayoutState | undefined>(undefined);

// Provider component
interface LayoutProviderProps {
  children: ReactNode;
  sidebarNavItems: NavConfig;
}

export function LayoutProvider({
  children,
  sidebarNavItems,
}: LayoutProviderProps) {
  const isMobile = useIsMobile();
  const [sidebarCollapse, setSidebarCollapse] = useState(() => !isMobile);

  useEffect(() => {
    setSidebarCollapse(!isMobile);
  }, [isMobile]);

  const [sidebarTheme, setSidebarTheme] = useState<SidebarTheme>("light");
  const initialPinned = sidebarNavItems.map((item) => item.id);
  const [sidebarPinnedNavItems, setSidebarPinnedNavItems] =
    useState<string[]>(initialPinned);
  const isSidebarNavItemPinned = (id: string) => {
    return sidebarPinnedNavItems.includes(id);
  };
  const pinSidebarNavItem = (id: string) => {
    setSidebarPinnedNavItems((prev) =>
      prev.includes(id) ? prev : [...prev, id],
    );
  };
  const unpinSidebarNavItem = (id: string) => {
    setSidebarPinnedNavItems((prev) => prev.filter((itemId) => itemId !== id));
  };
  const processedNavItems = useMemo(() => {
    return sidebarNavItems.map((item) => {
      return item;
    });
  }, [sidebarNavItems]);

  const getSidebarNavItems = () => {
    return processedNavItems;
  };
  return (
    <LayoutContext.Provider
      value={{
        sidebarCollapse,
        setSidebarCollapse,
        sidebarTheme,
        setSidebarTheme,
        isSidebarNavItemPinned,
        pinSidebarNavItem,
        unpinSidebarNavItem,
        getSidebarNavItems,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

// Custom hook for consuming the context
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
