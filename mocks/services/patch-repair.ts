import { PatchRepair } from "@/types/services/patch-repair";

const MOCK_PATCH_REPAIR = {
  tires4: {
    duration: 310,
    flexDiscount: 70,
    price: 350,
  },
  tires5: {
    duration: 50,
    flexDiscount: 10,
    price: 100,
  },
  tires6: {
    duration: 65,
    flexDiscount: 10,
    price: 350,
  },
  tires8: {
    duration: 45,
    flexDiscount: 0,
    price: 0,
  },
}

async function mockFetchPatchRepair(): Promise<PatchRepair> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_PATCH_REPAIR);
  }, 100));
}

export async function getPatchRepair(): Promise<PatchRepair | null> {
  try {
    return await mockFetchPatchRepair();
  } catch (error) {
    console.error(error);
    return null;
  }
}