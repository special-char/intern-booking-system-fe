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
import { SanitizedPermissions } from "payload";

export function NavigationSidebar({
  permissions,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  permissions: SanitizedPermissions;
}) {
  return (
    <Sidebar
      className="top-[var(--header-height)] !h-[calc(100svh-var(--header-height))] py-8 px-4 bg-slate-50"
      {...props}
    >
      <SidebarContent className="overflow-x-hidden">
        <NavMain items={menuItems.navMain} permissions={permissions}  />
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
