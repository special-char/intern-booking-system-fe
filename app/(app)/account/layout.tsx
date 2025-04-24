import { refreshAdmin } from "@/lib/data/admin";
import { redirect } from "next/navigation";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./providers";

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
    <Providers>{admin ? dashboard : login}</Providers>

  );
}
