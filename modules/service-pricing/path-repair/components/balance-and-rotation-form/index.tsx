"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";

import PricingCard from "../pricing-card";
import {
  balanceAndRotationFormSchema,
  balanceAndRotationFormDefaultValues,
} from "./balance-and-rotation-form.consts";


import PriceInputField from "../common/price-input-field";
import { Tooltip } from "@/components/common/tooltip";

export default function BalanceAndRotationForm() {
  const form = useForm<z.infer<typeof balanceAndRotationFormSchema>>({
    resolver: zodResolver(balanceAndRotationFormSchema),
    defaultValues: balanceAndRotationFormDefaultValues,
  });

  function onSubmit(values: z.infer<typeof balanceAndRotationFormSchema>) {
    console.log("Form values:", values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Balance & Rotation"
            description="Set the values for the balance & rotation"
          >
            <div className="grid grid-cols-4 gap-4 mb-1 font-semibold">
              <p></p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Job Duration (min){" "}
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Price{" "}
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Flex Discount{" "}
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                Balance
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <FormField
                control={form.control}
                name="balanceAndRotationDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-right font-medium"
                        placeholder="Job Duration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PriceInputField name="balanceAndRotationPrice" />
              <FormField
                control={form.control}
                name="balanceAndRotationFlexDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-right font-medium"
                        placeholder="Discount"
                        {...field}
                        value={`$${field.value}`}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const cleanValue = inputValue
                            .replace(/\$/g, "")
                            .trim();
                          field.onChange(cleanValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
