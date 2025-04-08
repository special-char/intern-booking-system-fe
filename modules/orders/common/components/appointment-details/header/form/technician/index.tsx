import {
  DropdownMenu,
  DropdownMenuProps,
} from "@/components/common/dropdown-menu";
import { FormField, FormItem, FormLabel } from "@/components/shadcn/form";
import { Skeleton } from "@/components/shadcn/skeleton";
import { getOrdersTechnicians } from "@/mocks/orders/orders-calendar";
import { Technician } from "@/types/technicians";

import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";

export function AppointmentDetailsTechnician() {
  const {
    isFetching,
    error,
    data: technicians,
  } = useQuery({
    queryKey: ["ordersTechnicians"],
    queryFn: () => getOrdersTechnicians(),
  });

  const form = useFormContext();

  if (isFetching || error) {
    return (
      <FormItem className="flex flex-col w-full">
        <FormLabel>Technician</FormLabel>
        {isFetching ? (
          <Skeleton className="min-h-9 rounded-lg" />
        ) : (
          <p className="text-sm text-destructive">Error fetching technicians</p>
        )}
      </FormItem>
    );
  }

  if (!technicians) {
    return null;
  }

  const techniciansDropdownData: DropdownMenuProps["data"] = technicians.map(
    ({ id, name }) => ({
      label: name ?? "",
      value: id ?? "",
    })
  );

  function formatValue(id: string): ReactElement {
    const technician: Partial<Technician> | undefined = technicians?.find(
      (technician) => technician.id === id
    );
    return (
      <div className="flex items-center gap-2 overflow-hidden">
        <Skeleton className="min-w-6 min-h-6 rounded-full" />
        <p className="overflow-hidden text-ellipsis">{technician?.name}</p>
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name="technician.id"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>Technician</FormLabel>
          <DropdownMenu
            data={techniciansDropdownData}
            labelFormatter={({ value }) => formatValue(value as string)}
            onSelect={field.onChange}
            value={field.value}
            valueFormatter={formatValue}
          />
        </FormItem>
      )}
    />
  );
}
