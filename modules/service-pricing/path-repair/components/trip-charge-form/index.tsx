"use client";

import PricingCard from "../pricing-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tripChargeFormSchema,
  tripChargeFormDefaultValues,
} from "./trip-charge-form.consts";
import { z } from "zod";

import { Input } from "@/components/shadcn/input";
import { FormProvider, useForm } from "react-hook-form";
import { Switch } from "@/components/shadcn/switch";
import { CircleDollarSign } from "lucide-react";

export default function TripChargeForm() {
  const form = useForm<z.infer<typeof tripChargeFormSchema>>({
    resolver: zodResolver(tripChargeFormSchema),
    defaultValues: tripChargeFormDefaultValues,
  });

  function onSubmit(values: z.infer<typeof tripChargeFormSchema>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Minimum Trip Charge"
            description="Non-Refundable Trip Charge"
          >
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="tripCharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-secondary">
                      Non-Refundable Trip Charge
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          leftIcon={
                            <CircleDollarSign className="w-4 h-4 text-icon-fg" />
                          }
                          placeholder="Wpisz kwotę"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTripChargeEnabled"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        size="large"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
