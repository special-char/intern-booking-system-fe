"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/shadcn/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Button } from "@/components/shadcn/button";

import {
  technicianFormSchema,
  technicianFormDefaultValues,
} from "./technician-form.consts";
import { createTechnician, updateTechnician } from "@/lib/data/technicians";
import { TechnicianFields } from "./technician-fields";

export type TechnicianFormType = z.infer<typeof technicianFormSchema>;

export function TechnicianForm({
  setIsOpen,
  isEdit = false,
  initialValues,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  initialValues?: TechnicianFormType & { id: string };
}) {
  const [preview, setPreview] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TechnicianFormType>({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: initialValues || technicianFormDefaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TechnicianFormType) => {
    const formData = {
      name: values.fullName,
      start_time: "2025-03-14T00:00:00.000Z",
      end_time: "2025-03-14T00:00:00.000Z",
      lunch_time_start: "2025-03-14T00:00:00.000Z",
      lunch_time_end: "2025-03-14T00:00:00.000Z",
    };

    if (isEdit && initialValues) {
      const technician = await updateTechnician(formData, initialValues.id);
      setIsSuccess(technician.isSuccess);
    } else {
      const technician = await createTechnician(formData);
      setIsSuccess(technician.isSuccess);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setPreview("");
      setIsSuccess(false);
      setIsOpen(false);
    }
  }, [form, isSuccess, setIsOpen]);

  const handleDiscard = () => {
    form.reset();
    setPreview("");
  };

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Technician" : "Add Technician"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <TechnicianFields
            form={form}
            setPreview={setPreview}
            preview={preview}
          />
          <SheetFooter className="border-t mt-auto pt-4 flex gap-2 flex-row">
            <Button
              variant="secondary"
              type="button"
              className="w-full"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"}
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
