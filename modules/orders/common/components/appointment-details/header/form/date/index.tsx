import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/form";

import { getFormattedDate } from "@/modules/orders/calendar-view/utils";
import { DateInput } from "@/components/common/date-input";
import { getLocalDateString } from "@/utils/date";
import moment from "moment";

export function AppointmentDetailsDate() {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Appointment date</FormLabel>
          <DateInput
            date={moment(field.value).toDate()}
            onChange={(date?: Date) => {
              const dateFormatted: string = getLocalDateString(date)
              const currentStart: string = form.getValues("event.start");
              const currentEnd: string = form.getValues("event.end");

              const startTime: string = currentStart.split('T')[1];
              const endTime: string = currentEnd.split('T')[1];

              form.setValue("event.start", `${dateFormatted}T${startTime}`);
              form.setValue("event.end", `${dateFormatted}T${endTime}`);

              return field.onChange(dateFormatted)
            }}
            dateFormatter={(date: Date) => {
              const dateFormatted: string = getLocalDateString(date)
              return getFormattedDate(dateFormatted, true);
            }}
            getIsDisabled={(date: Date) => {
              return moment(date).isBefore(moment())
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
