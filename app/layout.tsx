import { refreshAdmin } from "@/lib/data/admin";
import { redirect } from "next/navigation";
import "./globals.css";

export default async function AccountPageLayout({
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

  return admin ? dashboard : login;
}
