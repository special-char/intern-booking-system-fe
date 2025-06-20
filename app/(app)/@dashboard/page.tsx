import { CricketDashboard } from "@/modules/homepage/homepage-template";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Booking | Dashboard",
  description: "Business insights and daily activity",
};

export default function Homepage() {
  return <CricketDashboard />;
}
