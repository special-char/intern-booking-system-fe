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
import { Van } from "../van-table/columns";
type AddTechnicianFormType = z.infer<typeof addTechnicianFormSchema>;

export function AddVanForm({ van }: { van?: Van }) {
  const form = useForm<AddTechnicianFormType>({
    resolver: zodResolver(addTechnicianFormSchema),
    defaultValues: van
      ? addTechnicianFormInitialValues(van)
      : addTechnicianFormDefaultValues,
  });

  const onSubmit = (values: AddTechnicianFormType) => {
    console.log("Form values:", values);
  };

  return (
    <SheetContent className="sm:max-w-[500px]">
      <SheetHeader>
        <SheetTitle>Add Van</SheetTitle>
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
            <Button type="submit" className="w-full">
              Save
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
