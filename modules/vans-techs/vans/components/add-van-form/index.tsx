"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/shadcn/sheet";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

import {
  addTechnicianFormSchema,
  addTechnicianFormDefaultValues,
  addTechnicianFormInitialValues,
} from "./add-technician-form.consts";
import { TireVanDTO } from "@/types/tire-vans";
import { createTireVan, updateTireVan } from "@/lib/data/vans";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type AddTechnicianFormType = z.infer<typeof addTechnicianFormSchema>;

export function AddVanForm({
  van,
  isEdit,
  setIsOpen,
}: {
  van?: TireVanDTO;
  isEdit?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {

  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<AddTechnicianFormType>({
    resolver: zodResolver(addTechnicianFormSchema),
    defaultValues: van
      ? addTechnicianFormInitialValues(van)
      : addTechnicianFormDefaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: any) => { //TODO: fix type any
    if (isEdit && van) {
      const updatedVan = await updateTireVan(values, van.id);
      setIsSuccess(updatedVan.isSuccess);
      toast({
        title: "Van updated successfully",
      });
    } else {
      const newVan = await createTireVan(values);
      setIsSuccess(newVan.isSuccess);
      toast({
        title: "Van created successfully",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setIsSuccess(false);
      setIsOpen(false);
    }
  }, [form, isSuccess, setIsOpen]);

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Van" : "Add Van"}</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-2 flex flex-col gap-4 h-full"
        >
          <div className="px-4 flex flex-col gap-3 h-full">
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearAndMake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year & Make</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter manufacture year of the vehicle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelTrim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model / TRIM</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter model and trim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tireCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tire Capacity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter total tire capacity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SheetFooter className="border-t mt-auto pt-4 flex gap-2 flex-row">
            <Button variant="secondary" type="button" className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Save
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
