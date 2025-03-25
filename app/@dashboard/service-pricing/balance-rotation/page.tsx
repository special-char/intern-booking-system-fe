import { getBalanceRotation } from "@/mocks/services/balance-rotation";
import { BalanceRotationTemplate } from "@/modules/service-pricing/balance-rotation/templates";
import { InstallValue } from "@/types/services/install";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Balance & Rotation",
  description: "Treadcommand | Balance & Rotation",
};

export default async function BalanceRotationPage() {
  const balanceRotation: InstallValue | null = await getBalanceRotation();

  if (!balanceRotation) {
    return <div>No balance rotation found</div>;
  }

  return (
    <BalanceRotationTemplate balanceRotation={balanceRotation} />
  )
}
