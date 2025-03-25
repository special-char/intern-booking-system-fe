import { Fees } from "@/types/services/fees";
import StateEnvironmentalFeeForm from "../components/state-environmental-form";
import TireRecyclingFeeForm from "../components/tire-recycling-form";

interface FeesTemplateProps {
  fees: Fees
}

export function FeesTemplate({ fees }: FeesTemplateProps) {
  const { tireRecycling, state } = fees;

  return (
    <>
      <TireRecyclingFeeForm values={{ tireRecycling }} />
      <StateEnvironmentalFeeForm values={{ state }} />
    </>
  );
}