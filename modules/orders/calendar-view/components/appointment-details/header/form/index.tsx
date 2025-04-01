"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/shadcn/form";
import {
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Button } from "@/components/shadcn/button";

import { appointmentFormDefaultValues, appointmentFormSchema } from "./appointment-form";
import { AppointmentDetailsData } from "../..";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentDetailsTimeRange } from "./time-range";
import { AppointmentDetailsDate } from "./date";
import { AppointmentDetailsTechnician } from "./technician";

export type AppointmentFormType = z.infer<typeof appointmentFormSchema>;

interface AppointmentDetailsFormProps {
  initialValues?: AppointmentDetailsData
  onExitEditMode: () => void
  onChange: (data: AppointmentDetailsData) => void
}

export function AppointmentDetailsForm({ initialValues, onExitEditMode, onChange }: AppointmentDetailsFormProps) {
  const form = useForm<AppointmentFormType>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: initialValues || appointmentFormDefaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  function onSubmit(values: AppointmentFormType) {
    onChange({
      date: values.date,
      technician: {
        ...initialValues?.technician,
        id: values.technician.id,
        name: values.technician.name,
      },
      event: {
        ...initialValues?.event,
        start: values.event.start,
        end: values.event.end,
      },
    } as AppointmentDetailsData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <AppointmentDetailsDate />
        <AppointmentDetailsTimeRange />
        <AppointmentDetailsTechnician />
        <SheetFooter className="flex gap-3 flex-row p-0">
          <Button
            variant="secondary"
            type="button"
            className="w-full"
            onClick={onExitEditMode}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Update"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
