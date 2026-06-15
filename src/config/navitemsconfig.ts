import { NavConfig } from "@/@types/NavItem";
import { Briefcase, CheckSquare, LayoutGrid } from "lucide-react";
import { IoPeopleCircle, IoSettingsOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { LiaUserTieSolid } from "react-icons/lia";
import { RiContactsBook3Line } from "react-icons/ri";
import { FaFolderTree } from "react-icons/fa6";

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
    ]
  },

];
