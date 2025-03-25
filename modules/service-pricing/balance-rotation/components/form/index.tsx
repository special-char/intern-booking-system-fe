"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  Form,
} from "@/components/shadcn/form";

import { Tooltip } from "@/components/common/tooltip";
import { balanceRotationFormSchema } from "./form.consts";
import { InstallValue } from "@/types/services/install";
import PriceInputField from "../../../common/components/price-input-field";
import PricingCard from "../../../common/components/pricing-card";
import { DurationInputField } from "../../../install/components/duration-input-field";
import { FlexDiscountInputField } from "../../../install/components/flex-discount-input-field";
import { InstallFormHeader } from "../../../install/components/header";


interface BalanceRotationFormProps {
  values?: InstallValue
}

export default function BalanceRotationForm({ values }: BalanceRotationFormProps) {
  const form = useForm<z.infer<typeof balanceRotationFormSchema>>({
    resolver: zodResolver(balanceRotationFormSchema),
    defaultValues: values ? balanceRotationFormSchema.parse(values) : undefined,
  });

  function onSubmit(values: z.infer<typeof balanceRotationFormSchema>) {
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
            <InstallFormHeader />
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                Balance
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="duration" />
              <PriceInputField name="price" />
              <FlexDiscountInputField name="flexDiscount" />
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
