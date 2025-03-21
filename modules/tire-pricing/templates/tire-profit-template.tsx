import { getTirePricing } from "@/mocks/tire-pricing";
import ProfitMarginForm from "../components/profit-margin-form";
import RangeProfitForm from "../components/range-profit-form";
import { TirePricing } from "@/types/tire-pricing";

export async function TireProfitTemplate() {
  const tirePricing: TirePricing | null = await getTirePricing()

  if (!tirePricing) {
    return <p>Failed to load tire pricing</p>
  }

  return (
    <>
      <ProfitMarginForm margin={tirePricing?.profitMargin} />
      <RangeProfitForm minProfit={tirePricing.minProfit} maxProfit={tirePricing.maxProfit} />
    </>
  );
}