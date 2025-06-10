import { CricketDashboard } from "@/modules/homepage/templates/homepage-template";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Sports Booking | Dashboard - Box Stats",
   description: "Track earnings, refunds, commissions",
};

export default function BoxStats() {
   return <CricketDashboard />;
} 