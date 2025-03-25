import { Install } from "@/types/services/install";

const MOCK_INSTALL = {
  bundle: {
    tires1: {
      duration: 45,
      flexDiscount: 0,
      price: 0,
    },
    tires2: {
      duration: 65,
      flexDiscount: 10,
      price: 350,
    },
    tires3: {
      duration: 50,
      flexDiscount: 10,
      price: 100,
    },
    tires4: {
      duration: 310,
      flexDiscount: 70,
      price: 350,
    },
  },
  installOnly: {
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
}

async function mockFetchInstall(): Promise<typeof MOCK_INSTALL> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_INSTALL);
  }, 100));
}

export async function getInstall(): Promise<Install | null> {
  try {
    return await mockFetchInstall();
  } catch (error) {
    console.error(error);
    return null;
  }
}