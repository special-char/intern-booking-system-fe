import { PatchRepair } from "@/types/services/patch-repair";
import PatchRepairForm from "../components/form";

interface PatchRepairTemplateProps {
  patchRepair: PatchRepair
}

export function PatchRepairTemplate({ patchRepair }: PatchRepairTemplateProps) {
  return (
    <PatchRepairForm values={patchRepair} />
  );
}