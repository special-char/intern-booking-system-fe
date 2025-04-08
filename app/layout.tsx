import { refreshAdmin } from "@/lib/data/admin";
import { redirect } from "next/navigation";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";

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

export default async function Layout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode;
  login: React.ReactNode;
}) {
  const admin = await refreshAdmin();

  if (!admin && !login) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{admin ? dashboard : login}</Providers>
      </body>
    </html>
  );
}
