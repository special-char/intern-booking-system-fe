import { getFees } from "@/mocks/services/fees";
import { FeesTemplate } from "@/modules/service-pricing/fees/templates";
import { Fees } from "@/types/services/fees";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Fees",
  description: "Treadcommand | Fees",
};

export default async function FeesPage() {
  const fees: Fees | null = await getFees();

  if (!fees) {
    return <div>No fees found</div>;
  }

  return (
    <FeesTemplate fees={fees} />
  )
}
