import { getJobsNum } from "@/modules/orders/calendar-view/utils";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useMemo } from "react";
import { UnroutedOverlayContent } from "./content";

interface UnroutedOverlayProps {
  ordersCalendar: OrdersCalendar;
}

export function UnroutedOverlay({ ordersCalendar }: UnroutedOverlayProps) {
  const {
    installationsMorning,
    installationsAfternoon,
    inspectionsMorning,
    inspectionsAfternoon,
  } = useMemo(() => {
    return {
      installationsMorning: getJobsNum({
        ordersCalendar,
        type: "installation",
        beforeHour: 13,
      }),
      installationsAfternoon: getJobsNum({
        ordersCalendar,
        type: "installation",
        afterHour: 13,
      }),
      inspectionsMorning: getJobsNum({
        ordersCalendar,
        type: "inspection",
        beforeHour: 13,
      }),
      inspectionsAfternoon: getJobsNum({
        ordersCalendar,
        type: "inspection",
        afterHour: 13,
      }),
    };
  }, [ordersCalendar]);

  return (
    <>
      <div className="absolute left-15 top-29 right-0 h-132 bg-yellow-50 flex justify-center items-center border-yellow-300 border-2 rounded-sm z-11">
        <UnroutedOverlayContent
          jobsTotal={installationsMorning + inspectionsMorning}
          label="Morning flex"
          installations={installationsMorning}
          inspections={inspectionsMorning}
        />
      </div>
      <div className="absolute left-15 top-161 right-0 h-[38.55rem] bg-red-50 flex justify-center items-center border-red-300 border-2 rounded-sm z-11">
        <UnroutedOverlayContent
          jobsTotal={installationsAfternoon + inspectionsAfternoon}
          label="Afternoon flex"
          installations={installationsAfternoon}
          inspections={inspectionsAfternoon}
        />
      </div>
    </>
  );
}
