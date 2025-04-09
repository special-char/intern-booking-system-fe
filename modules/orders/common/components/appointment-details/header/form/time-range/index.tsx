import { FieldErrors, useFormContext, useWatch } from "react-hook-form";
import { AppointmentDetailsTimeRangePicker } from "./picker";
import { FormMessage } from "@/components/shadcn/form";
import { DropdownMenuProps } from "@/components/common/dropdown-menu";
import { getFormattedHour } from "@/modules/orders/calendar-view/utils";
import moment from "moment";

export function AppointmentDetailsTimeRange() {
  const { formState: { errors } } = useFormContext();
  const dateStringWatch = useWatch({ name: "date" })

  const timeSlots: DropdownMenuProps['data'] = generateTimeSlots();

  function generateTimeSlots(): DropdownMenuProps['data'] {
    const timeSlots: DropdownMenuProps['data'] = [];
    const currentDay: string = moment(dateStringWatch).format('YYYY-MM-DD')
    const startHour: number = 7;
    const startMinute: number = 0;
    const endHour: number = 19;
    const endMinute: number = 0;

    let currentHour: number = startHour;
    let currentMinute: number = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const formattedHour: string = currentHour.toString().padStart(2, '0');
      const formattedMinute: string = currentMinute.toString().padStart(2, '0');
      const value: string = `${currentDay}T${formattedHour}:${formattedMinute}:00`
      timeSlots.push({
        label: getFormattedHour(value),
        value
      })

      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += 1;
        currentMinute = 0;
      }
    }

    return timeSlots;
  }

  function renderError(errors: FieldErrors<{ event: { timeRange: { message: string } } }>) {
    if (errors.event?.timeRange?.message) {
      return <FormMessage>{errors.event.timeRange.message as string}</FormMessage>;
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <AppointmentDetailsTimeRangePicker
          name="event.start"
          label="Start time"
          timeSlots={timeSlots}
        />
        <AppointmentDetailsTimeRangePicker
          name="event.end"
          label="End time"
          timeSlots={timeSlots}
        />
      </div>
      {renderError(errors)}
    </div>
  );
}