import { NavConfig } from "@/@types/NavItem";
import { CheckSquare, LayoutGrid } from "lucide-react";
import { RiContactsBook3Line } from "react-icons/ri";

export const MAIN_NAV: NavConfig = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    path: "/",
    id: "dashboard",
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    path: "/tasks",
    id: "tasks",
  },
  {
    icon: RiContactsBook3Line,
    title: "Contacts",
    path: "/contacts",
    id: "contacts",
    new: {
      tooltip: "New Contact",
      path: "/contacts/new",
    },
  },
];
