import { useScreenCarousel } from "@/components/common/screen-carousel/context";
import { ActionCard } from "../../content/common/action-card";

export function VehicleDetailsPreInspectionCheckDetails() {
  const { onCurrentScreenChange } = useScreenCarousel()

  return (
    <ActionCard
      title="PRE-INSPECTION CHECK DETAILS"
      onClick={() => onCurrentScreenChange(2)}
    />
  );
}