import { getInstall } from "@/mocks/services/install";
import { InstallTemplate } from "@/modules/service-pricing/install/templates";
import { Install } from "@/types/services/install";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Install",
  description: "Treadcommand | Install",
};


export default async function InstallPage() {
  const install: Install | null = await getInstall();

  if (!install) {
    return <div>No install found</div>;
  }

  return (
    <InstallTemplate install={install} />
  );
}