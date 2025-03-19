import { TireSupplier } from "@/types/tire-brand";

export const MOCKED_TIRE_SUPPLIERS: TireSupplier[] = [
  {
    id: "1",
    name: "ATD",
  },
  {
    id: "2",
    name: "Tire Rack Wholesale",
  },
  {
    id: "3",
    name: "NTW",
  },
  {
    id: "4",
    name: "Usa Auto Force",
  }
]

export async function mockFetchTireSuppliers(): Promise<TireSupplier[]> {
  return new Promise(resolve => setTimeout(() => {
    resolve(MOCKED_TIRE_SUPPLIERS);
  }, 300)) as Promise<TireSupplier[]>;
}

export async function getTireSuppliers(): Promise<TireSupplier[] | null> {
  try {
    return await mockFetchTireSuppliers();
  } catch (error) {
    console.error(error);
    return null
  }
}