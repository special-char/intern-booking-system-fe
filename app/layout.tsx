import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/shadcn/sidebar";
import { NavigationSidebar } from "@/modules/layout/components/navigation-sidebar";
import { Header } from "@/modules/layout/components/header";
import { SidebarInset } from "@/components/shadcn/sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Treadcommand | Dashboard",
  description: "Treadcommand | Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="[--header-height:calc(theme(spacing.16))]">
          <SidebarProvider className="flex flex-col">
            <Header />
            <div className="flex flex-1">
              <NavigationSidebar />
              <SidebarInset className="max-w-full">{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
