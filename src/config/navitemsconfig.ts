import { NavConfig } from "@/@types/NavItem";
import { CheckSquare, LayoutGrid } from "lucide-react";
import { LuContact } from "react-icons/lu";

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
    icon: LuContact,
    title: "Contacts",
    path: "/contacts",
    id: "contacts",
    new: {
      tooltip: "New Contact",
      path: "/contacts/new",
    },
  },
];
