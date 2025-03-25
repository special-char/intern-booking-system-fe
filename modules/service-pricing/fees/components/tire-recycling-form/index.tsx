"use client";

import {
  Form,
} from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { FormProvider, useForm } from "react-hook-form";
import { tireRecyclingFormSchema } from "./form.consts";
import { Fees } from "@/types/services/fees";
import PricingCard from "../../../common/components/pricing-card";
import FeeInputField from "../input-field";

interface TireRecyclingFeeFormProps {
  values?: Pick<Fees, 'tireRecycling'>;
}

export default function TireRecyclingFeeForm({ values }: TireRecyclingFeeFormProps) {
  const form = useForm<z.infer<typeof tireRecyclingFormSchema>>({
    resolver: zodResolver(tireRecyclingFormSchema),
    defaultValues: values ? tireRecyclingFormSchema.parse(values) : undefined,
  });

  function onSubmit(values: z.infer<typeof tireRecyclingFormSchema>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Tire Recycling"
            description="Set the values for the tire recycling"
          >
            <FeeInputField name="tireRecycling" />
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
