"use client";

import {
  Form,
} from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { FormProvider, useForm } from "react-hook-form";
import { stateEnvironmentalFormSchema } from "./form.consts";
import { Fees } from "@/types/services/fees";
import PricingCard from "../../../common/components/pricing-card";
import FeeInputField from "../input-field";

interface StateEnvironmentalFeeFormProps {
  values?: Pick<Fees, 'state'>;
}

export default function StateEnvironmentalFeeForm({ values }: StateEnvironmentalFeeFormProps) {
  const form = useForm<z.infer<typeof stateEnvironmentalFormSchema>>({
    resolver: zodResolver(stateEnvironmentalFormSchema),
    defaultValues: values ? stateEnvironmentalFormSchema.parse(values) : undefined,
  });

  function onSubmit(values: z.infer<typeof stateEnvironmentalFormSchema>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="State Environmental"
            description="Set the values for the state environmental"
          >
            <FeeInputField name="state" />
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
