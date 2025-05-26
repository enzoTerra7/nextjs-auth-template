import { NavItem } from "./nav.definitions";
import { Home, ShoppingCart, Users } from "lucide-react";

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
  {
    label: "Products",
    href: "/onboard/products",
    icon: <ShoppingCart />,
    partialMatch: true,
  },
];

export const userNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/onboard",
    icon: <Home />,
  },
];
