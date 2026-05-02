import { NavConfig } from "@/@types/NavItem";
import { CheckSquare, LayoutGrid } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { RiContactsBook3Line } from "react-icons/ri";

export const MAIN_NAV: NavConfig = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    path: "/",
    haveSubmenu: false,
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    path: "/tasks",
    haveSubmenu: false
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
    icon: IoSettingsOutline,
    title: "Configuration",
    path: "/configuration",
    haveSubmenu: true,
    submenu: [
      {
        title: "Department",
        path: "/department",
      },
      {
        title: "Role",
        path: "/role",
      },
    ]
  },

];
