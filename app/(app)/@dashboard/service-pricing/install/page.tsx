import { InstallTemplate } from "@/modules/service-pricing/install/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Install",
  description: "Treadcommand | Install",
};

export default async function InstallPage() {
  return <InstallTemplate />;
}
