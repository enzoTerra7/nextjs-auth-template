import { Suspense } from "react";
import { navItems } from "../nav/nav.config";
import { NavItem } from "../nav/nav.item";
import { SidebarContentContainer } from "./sidebar-content-container";
import { Skeleton } from "@/app/_components/ui/skeleton";

export async function Sidebar() {
  return (
    <aside className="w-64 h-dvh bg-card border-r border-border">
      <SidebarContentContainer customComp={"nav"}>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href.trim()}>
              <Suspense fallback={<Skeleton className="w-full h-10" />}>
                <NavItem {...item} />
              </Suspense>
            </li>
          ))}
        </ul>
      </SidebarContentContainer>
    </aside>
  );
}
