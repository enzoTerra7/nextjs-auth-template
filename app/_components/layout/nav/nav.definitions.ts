import { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  partialMatch?: boolean;
};
