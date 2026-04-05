import { type LucideIcon } from 'lucide-react';
import { IconType } from "react-icons/lib";

export interface NavItem {
  id: string;
  title?: string;
  icon?: LucideIcon | IconType;
  path?: string;
  new?: {
    tooltip: string;
    path: string;
  };
}

export type NavConfig = NavItem[];