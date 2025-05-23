import { TripCharge } from "@/types/services/trip-charge";

const MOCK_TRIP_CHARGE: TripCharge = {
  value: 0,
  isEnabled: true,
};

async function mockFetchTripCharge(): Promise<TripCharge> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(MOCK_TRIP_CHARGE);
    }, 100)
  );
}

export async function getTripCharge(): Promise<TripCharge | null> {
  try {
    return await mockFetchTripCharge();
  } catch (error) {
    console.error(error);
    return null;
  }
}
