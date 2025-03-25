import { getPatchRepair } from "@/mocks/services/patch-repair";
import { PatchRepairTemplate } from "@/modules/service-pricing/patch-repair/templates";
import { PatchRepair } from "@/types/services/patch-repair";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Patch Repair",
  description: "Treadcommand | Patch Repair",
};

export default async function PathRepairPage() {
  const patchRepair: PatchRepair | null = await getPatchRepair();

  if (!patchRepair) {
    return <div>No patch repair found</div>;
  }

  return <PatchRepairTemplate patchRepair={patchRepair} />;
}
