import { BalanceRotationTemplate } from "@/modules/service-pricing/balance-rotation/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Balance & Rotation",
  description: "Treadcommand | Balance & Rotation",
};

export default async function BalanceRotationPage() {
  return <BalanceRotationTemplate />;
}
