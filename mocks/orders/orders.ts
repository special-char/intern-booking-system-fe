const MOCK_RENEVUE_GOAL = {
  current: 27120.56,
  target: 48520.0,
}

async function mockFetchRevenueGoal(): Promise<typeof MOCK_RENEVUE_GOAL> {
  return new Promise((resolve) => setTimeout(() => {
    resolve(MOCK_RENEVUE_GOAL);
  }, 100));
}

export async function getRevenueGoal(): Promise<typeof MOCK_RENEVUE_GOAL | null> {
  try {
    return await mockFetchRevenueGoal();
  } catch (error) {
    console.error(error);
    return null;
  }
}