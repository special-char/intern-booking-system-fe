import { TirePricing } from "@/types/tire-pricing";

const MOCK_TIRE_PRICING: TirePricing = {
  maxProfit: 50,
  minProfit: 25,
  profitMargin: 25
}

async function mockFetchTirePricing(): Promise<TirePricing> {
  return new Promise(resolve => setTimeout(() => {
    resolve(MOCK_TIRE_PRICING);
  }, 100)) as Promise<TirePricing>;
}

export async function getTirePricing(): Promise<TirePricing | null> {
  try {
    return await mockFetchTirePricing();
  } catch (error) {
    console.error(error);
    return null
  }
}
