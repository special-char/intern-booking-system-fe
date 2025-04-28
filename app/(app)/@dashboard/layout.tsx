

import { SidebarProvider } from "@/components/shadcn/sidebar";
import { NavigationSidebar } from "@/modules/layout/components/navigation-sidebar";
import { Header } from "@/modules/layout/components/header";
import { SidebarInset } from "@/components/shadcn/sidebar";
import { DashboardTabs } from "@/modules/dashboard/common/components/tabs";
import { getUser } from "@/lib/data/admin";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { permissions } = await getUser()

  return (
    <div className="[--header-height:calc(theme(spacing.16))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <NavigationSidebar permissions={permissions} />
          <SidebarInset className="md:max-w-[calc(100%-17.5rem)] w-full">
            <DashboardTabs />
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
