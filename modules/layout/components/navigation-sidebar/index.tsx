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

export function NavigationSidebar() {
  return (
    <Sidebar collapsible="icon" className="py-8 px-4 w-72 bg-slate-50">
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
