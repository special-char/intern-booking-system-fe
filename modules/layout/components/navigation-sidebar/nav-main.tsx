"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/sidebar";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isExpandable?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    matchNested?: boolean
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.matchNested ? pathname.includes(item.url ?? "") : pathname === item.url;
          const isChildActive = item.items?.some(
            (subItem) => pathname === subItem.url
          );
          const shouldExpand = item.isActive || isChildActive;

          return (
            <Fragment key={item.title}>
              {item.isExpandable ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={shouldExpand}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={cn(
                          "py-3 pl-5 pr-3 text-[13px] font-medium text-text-primary cursor-pointer min-h-10 hover:bg-white hover:text-text-primary-brand hover:shadow-side-nav",
                          isActive &&
                          "bg-white text-text-primary-brand font-semibold shadow-side-nav"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-none mx-0">
                        {item.items?.map((subItem) => {
                          const isActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className={cn(
                                "text-text-primary",
                                isActive &&
                                "bg-white text-text-primary-brand font-semibold shadow-side-nav rounded-lg"
                              )}
                            >
                              <SidebarMenuSubButton
                                asChild
                                className="py-3 min-h-9"
                              >
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    "hover:bg-white hover:text-text-primary-brand hover:shadow-side-nav px-9"
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="py-3 pl-5 pr-4 text-[13px] font-medium text-text-primary cursor-pointer min-h-10"
                  >
                    {item.url ? (
                      <Link
                        href={item.url}
                        className={cn(
                          "hover:bg-white hover:text-text-primary-brand hover:shadow-side-nav",
                          isActive &&
                          "bg-white text-text-primary-brand font-semibold shadow-side-nav"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </Fragment>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
