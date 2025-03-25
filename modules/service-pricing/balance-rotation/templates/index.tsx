import { InstallValue } from "@/types/services/install";
import BalanceRotationForm from "../components/form";

interface BalanceRotationTemplateProps {
  balanceRotation: InstallValue
}

export function BalanceRotationTemplate({ balanceRotation }: BalanceRotationTemplateProps) {
  return (
    <BalanceRotationForm values={balanceRotation} />
  );
}
