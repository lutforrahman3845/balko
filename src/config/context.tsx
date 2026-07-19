"use client";

import { NavConfig, NavSectionConfig } from "@/@types/NavItem";
import {
  DEFAULT_LAYOUT_VARIANT,
  isLayoutVariant,
  type LayoutVariant,
} from "@/@types/layout";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  useHydrated,
  usePersistedPreference,
} from "@/lib/persisted-preference";

const LAYOUT_STORAGE_KEY = "balko-layout-variant";
const COLLAPSE_STORAGE_KEY = "balko-sidebar-collapsed";

interface LayoutState {
  sidebarCollapse: boolean;
  setSidebarCollapse: (collapsed: boolean) => void;
  layoutVariant: LayoutVariant;
  setLayoutVariant: (variant: LayoutVariant) => void;
  /** False until the persisted preferences have been read from storage. */
  layoutReady: boolean;
  getSidebarNavItems: () => NavConfig;
  getSidebarNavSections: () => NavSectionConfig;
}

const LayoutContext = createContext<LayoutState | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
  sidebarNavItems: NavConfig;
  sidebarNavSections: NavSectionConfig;
}

export function LayoutProvider({
  children,
  sidebarNavItems,
  sidebarNavSections,
}: LayoutProviderProps) {
  // Both preferences come straight from storage rather than through an effect,
  // so there is no cascading render on mount. The server render and hydration
  // both see the defaults; `layoutReady` flips once hydration is done, which
  // is what holds back the width transition on first paint.
  const [layoutVariant, setLayoutVariant] = usePersistedPreference<LayoutVariant>(
    LAYOUT_STORAGE_KEY,
    DEFAULT_LAYOUT_VARIANT,
    (raw) => (isLayoutVariant(raw) ? raw : DEFAULT_LAYOUT_VARIANT),
  );

  const [sidebarCollapse, setSidebarCollapse] = usePersistedPreference<boolean>(
    COLLAPSE_STORAGE_KEY,
    false,
    (raw) => raw === "true",
  );

  const layoutReady = useHydrated();

  const getSidebarNavItems = useCallback(
    () => sidebarNavItems,
    [sidebarNavItems],
  );

  const getSidebarNavSections = useCallback(
    () => sidebarNavSections,
    [sidebarNavSections],
  );

  const value = useMemo<LayoutState>(
    () => ({
      sidebarCollapse,
      setSidebarCollapse,
      layoutVariant,
      setLayoutVariant,
      layoutReady,
      getSidebarNavItems,
      getSidebarNavSections,
    }),
    [
      sidebarCollapse,
      setSidebarCollapse,
      layoutVariant,
      setLayoutVariant,
      layoutReady,
      getSidebarNavItems,
      getSidebarNavSections,
    ],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
