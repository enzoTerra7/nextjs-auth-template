import { NavItem } from "./nav.definitions";
import { Home, Users } from "lucide-react";

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/onboard",
    icon: <Home />,
  },
  {
    label: "Users",
    href: "/onboard/users",
    icon: <Users />,
  },
];

export const userNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/onboard",
    icon: <Home />,
  },
];
