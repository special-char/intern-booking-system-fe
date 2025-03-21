import { getTires } from "@/mocks/tire";
import RecommendedTiresCard from ".";

export async function RecommendedTiresCardTemplate() {
  const tires = await getTires(true);

  return (<RecommendedTiresCard tires={tires ?? []} />);
}