import { Fees } from "@/types/services/fees";

const MOCK_FEES = {
  tireRecycling: 400,
  state: 400
}

async function mockFetchFees(): Promise<Fees> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_FEES);
  }, 100));
}

export async function getFees(): Promise<Fees | null> {
  try {
    return await mockFetchFees();
  } catch (error) {
    console.error(error);
    return null;
  }
}