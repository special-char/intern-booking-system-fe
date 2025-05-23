import { PatchRepairTemplate } from "@/modules/service-pricing/patch-repair/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Patch Repair",
  description: "Treadcommand | Patch Repair",
};

export default async function PathRepairPage() {
  return <PatchRepairTemplate />;
}
