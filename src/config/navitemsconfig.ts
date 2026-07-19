import { NavConfig, NavSectionConfig } from "@/@types/NavItem";
import {
  Briefcase,
  CheckSquare,
  LayoutGrid,
  BarChart3,
  Calendar,
  MessageSquare,
  Component,
  Gauge,
  KanbanSquare,
  Contact,
  Users,
  Settings2,
} from "lucide-react";
import { IoPeopleCircle, IoSettingsOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaFolderTree } from "react-icons/fa6";

const NAV_ITEMS: NavConfig = [
  {
    title: "Dashboards",
    icon: LayoutGrid,
    path: "/",
    haveSubmenu: true,
    submenu: [
      {
        title: "Overview",
        path: "/",
      },
      {
        title: "Executive",
        path: "/dashboards/executive",
      },
      {
        title: "Operations",
        path: "/dashboards/operations",
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
    haveSubmenu: false,
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    path: "/tasks",
    haveSubmenu: false
  },
  {
    icon: Calendar,
    title: "Calendar",
    path: "/calendar",
    haveSubmenu: false,
  },
  {
    icon: MessageSquare,
    title: "Chat",
    path: "/chat",
    haveSubmenu: false,
  },
  {
    icon: RiContactsBook3Line,
    title: "Contacts",
    path: "/contacts",
    new: {
      tooltip: "New Contact",
      path: "/contacts/new",
    },
    haveSubmenu: false,
  },
  {
    icon: LuBuilding2,
    title: "Companies",
    path: "/companies",
    new: {
      tooltip: "New Company",
      path: "/companies/new",
    },
    haveSubmenu: false,
  },
  {
    icon: LiaUserTieSolid,
    title: "Employees",
    path: "/employees",
    haveSubmenu: false,
  },
  {
    icon: IoPeopleCircle,
    title: "Teams",
    path: "/teams",
    haveSubmenu: false,
  },
  {
    icon: Briefcase,
    title: "Projects",
    path: "/projects",
    new: {
      tooltip: "New Project",
      path: "/projects/new",
    },
    haveSubmenu: false,
  },
  {
    icon: FaFolderTree,
    title: "Folders",
    path: "/folders",
    haveSubmenu: false
  },
  {
    icon: Component,
    title: "UI Kit",
    path: "/ui-kit",
    haveSubmenu: false,
  },
  {
    icon: IoSettingsOutline,
    title: "Configuration",
    path: "/configuration",
    haveSubmenu: true,
    submenu: [
      {
        title: "Department",
        path: "/configuration/department",
      },
      {
        title: "Role",
        path: "/configuration/role",
      },
      {
        title: "Company Type",
        path: "/configuration/company-type",
      },
      {
        title:"Document Type",
        path:"/configuration/document-type"
      }
    ]
  },

];

const byPath = (path: string): NavConfig[number] => {
  const item = NAV_ITEMS.find((navItem) => navItem.path === path);
  if (!item) {
    throw new Error(`Nav item not found for path: ${path}`);
  }
  return item;
};

/**
 * Grouped navigation. Sections describe what a page is *for* — the shells read
 * this to render headings, rail groups, and the two-column page menu.
 * Add a new page by adding it to NAV_ITEMS and listing its path in a section.
 */
export const MAIN_NAV_SECTIONS: NavSectionConfig = [
  {
    title: "Workspace",
    icon: Gauge,
    items: [byPath("/"), byPath("/analytics"), byPath("/calendar"), byPath("/chat")],
  },
  {
    title: "Work",
    icon: KanbanSquare,
    items: [byPath("/tasks"), byPath("/projects"), byPath("/folders")],
  },
  {
    title: "Customers",
    icon: Contact,
    items: [byPath("/contacts"), byPath("/companies")],
  },
  {
    title: "People",
    icon: Users,
    items: [byPath("/employees"), byPath("/teams")],
  },
  {
    title: "System",
    icon: Settings2,
    items: [byPath("/configuration"), byPath("/ui-kit")],
  },
];

/** Flat view of the same items, for shells and search that ignore grouping. */
export const MAIN_NAV: NavConfig = MAIN_NAV_SECTIONS.flatMap(
  (section) => section.items,
);
