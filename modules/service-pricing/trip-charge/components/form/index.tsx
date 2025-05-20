"use client";

import PricingCard from "../../../common/components/pricing-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Input } from "@/components/shadcn/input";
import { FormProvider, useForm } from "react-hook-form";
import { Switch } from "@/components/shadcn/switch";
import { CircleDollarSign } from "lucide-react";
import { TripCharge } from "@/types/services/trip-charge";
import { tripChargeFormSchema } from "./form.consts";
import { CollectionAfterChangeHook } from "payload";

interface TripChargeFormProps {
  tripCharge: TripCharge;
}

export default function TripChargeForm({ tripCharge }: TripChargeFormProps) {
  const form = useForm<z.infer<typeof tripChargeFormSchema>>({
    resolver: zodResolver(tripChargeFormSchema),
    defaultValues: {
      tripCharge: tripCharge.value,
      isTripChargeEnabled: tripCharge.isEnabled,
    },
  });

  function onSubmit(values: z.infer<typeof tripChargeFormSchema>) {
    console.log("trip charge values", values);

    // const afterChangeHook: CollectionAfterChangeHook = async ({
    //   req: { payload },
    // }) => {
    //   const posts = await payload.create({
    //     collection: "services",
    //     data: {
    //       price: values.tripCharge,
    //       isRefundable: values.isTripChargeEnabled ? "Yes" : "No",
    //       service: "Trip Charge",
    //       territory: "All",
    //     },
    //   });
    // };
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
                      <Input
                        leftIcon={
                          <CircleDollarSign className="w-4 h-4 text-icon-fg" />
                        }
                        placeholder="trip charge"
                        {...field}
                      />
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
