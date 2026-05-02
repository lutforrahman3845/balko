import { NavConfig } from "@/@types/NavItem";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type SidebarTheme = "dark" | "light";

// Define the shape of the layout state
interface LayoutState {
  sidebarCollapse: boolean;
  setSidebarCollapse: (open: boolean) => void;
  sidebarTheme: SidebarTheme;
  setSidebarTheme: (theme: SidebarTheme) => void;
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
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [sidebarTheme, setSidebarTheme] = useState<SidebarTheme>("light");
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
