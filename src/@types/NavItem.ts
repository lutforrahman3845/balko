import { type LucideIcon } from 'lucide-react';
import { IconType } from "react-icons/lib";

export interface NavItem {
  title: string;
  icon: LucideIcon | IconType;
  path: string;
  new?: {
    tooltip: string;
    path: string;
  };
  haveSubmenu: boolean;
  submenu?: {
    title: string;
    path: string;
    new?: {
      tooltip: string;
      path: string;
    };
  }[]
}

export type NavConfig = NavItem[];

export interface NavSection {
  title: string;
  icon: LucideIcon | IconType;
  items: NavConfig;
}

export type NavSectionConfig = NavSection[];