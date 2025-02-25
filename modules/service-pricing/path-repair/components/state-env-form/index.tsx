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
  FormLabel,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";

import PricingCard from "../pricing-card";
import {
  stateEnvFormSchema,
  stateEnvFormDefaultValues,
} from "./state-env-form.consts";

export default function StateEnvForm() {
  const form = useForm<z.infer<typeof stateEnvFormSchema>>({
    resolver: zodResolver(stateEnvFormSchema),
    defaultValues: stateEnvFormDefaultValues,
  });

  function onSubmit(values: z.infer<typeof stateEnvFormSchema>) {
    console.log("Form values:", values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="State Environmental"
            description="Set the values for the state environmental fee"
          >
            <FormField
              control={form.control}
              name="recylingFee"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="mb-0 text-sm text-text-secondary">
                    Recycling Fee per tire
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-right font-medium"
                      placeholder="Recycling fee"
                      {...field}
                      value={`$${field.value}`}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const cleanValue = inputValue.replace(/\$/g, "").trim();
                        field.onChange(cleanValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
