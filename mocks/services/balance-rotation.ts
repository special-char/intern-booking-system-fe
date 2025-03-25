import { InstallValue } from "@/types/services/install";

const MOCK_BALANCE_ROTATION = {
  duration: 310,
  flexDiscount: 70,
  price: 350
}

async function mockFetchBalanceRotation(): Promise<InstallValue> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_BALANCE_ROTATION);
  }, 100));
}

export async function getBalanceRotation(): Promise<InstallValue | null> {
  try {
    return await mockFetchBalanceRotation();
  } catch (error) {
    console.error(error);
    return null;
  }
}