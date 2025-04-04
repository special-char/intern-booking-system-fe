import { DropdownMenuProps } from "@/components/common/dropdown-menu";
import { DropdownMenu } from "@/components/common/dropdown-menu";
import { FormField, FormItem, FormLabel } from "@/components/shadcn/form";
import { getFormattedHour } from "@/modules/orders/calendar-view/utils";
import { useFormContext } from "react-hook-form";

interface AppointmentDetailsTimeRangePickerProps {
  name: string
  label: string
  timeSlots: DropdownMenuProps['data']
}

export function AppointmentDetailsTimeRangePicker({ name, label, timeSlots }: AppointmentDetailsTimeRangePickerProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-1/2">
          <FormLabel>{label}</FormLabel>
          <DropdownMenu
            data={timeSlots}
            onSelect={field.onChange}
            value={field.value}
            valueFormatter={getFormattedHour}
          />
        </FormItem>
      )}
    />
  );
}