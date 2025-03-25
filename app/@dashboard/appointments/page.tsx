import AppointmentsTemplate from "@/modules/dashboard/appointments/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treadcommand | Dashboard - appointments",
  description: "Treadcommand | Dashboard - appointments",
};

export default async function AppointmentsPage() {
  return (
    <div className="px-6">
      <AppointmentsTemplate />
    </div>
  );
}
