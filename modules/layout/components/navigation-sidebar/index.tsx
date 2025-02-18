"use client";

import * as React from "react";
import { Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/shadcn/sidebar";
import { NavMain } from "./nav-main";
import { Button } from "@/components/shadcn/button";
import { menuItems } from "./navigation.consts";

export function NavigationSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      className="top-[var(--header-height)] !h-[calc(100svh-var(--header-height))] py-8 px-4 bg-slate-50"
      {...props}
    >
      <SidebarContent>
        <NavMain items={menuItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-fit">
          <Settings />
          Settings
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
