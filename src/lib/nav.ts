import type { NavItem, NavSection, NavSectionConfig } from "@/@types/NavItem";

/**
 * A path is active when it matches exactly, or when the current route is one
 * of its descendants. "/" is matched exactly so the dashboard does not stay
 * highlighted on every page.
 */
export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return path === pathname || pathname.startsWith(path + "/");
}

/** True when the item itself or any of its children matches the route. */
export function isItemActive(item: NavItem, pathname: string): boolean {
  return (
    isActivePath(item.path, pathname) ||
    !!item.submenu?.some((sub) => isActivePath(sub.path, pathname))
  );
}

/**
 * The section owning the current route. Falls back to the first section so
 * shells that always render a section (rail, two-column) have something to
 * show on unrecognised routes.
 */
export function findActiveSection(
  sections: NavSectionConfig,
  pathname: string,
): NavSection {
  const match = sections.find((section) =>
    section.items.some((item) => isItemActive(item, pathname)),
  );
  return match ?? sections[0];
}
