"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  Form,
} from "@/components/shadcn/form";

import { Tooltip } from "@/components/common/tooltip";
import { InstallBundle } from "@/types/services/install";
import { installBundleFormSchema } from "./form.consts";
import PriceInputField from "@/modules/service-pricing/common/components/price-input-field";
import PricingCard from "@/modules/service-pricing/common/components/pricing-card";
import { DurationInputField } from "../../duration-input-field";
import { FlexDiscountInputField } from "../../flex-discount-input-field";
import { InstallFormHeader } from "../../header";

interface InstallBundleFormProps {
  values?: InstallBundle
}

export default function InstallBundleForm({ values }: InstallBundleFormProps) {
  const form = useForm<z.infer<typeof installBundleFormSchema>>({
    resolver: zodResolver(installBundleFormSchema),
    defaultValues: values ? installBundleFormSchema.parse(values) : undefined,
  });

  function onSubmit(values: z.infer<typeof installBundleFormSchema>) {
    console.log("Form values:", values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Tires + Install Bundle"
            description="Set the values for the installation bundle"
          >
            <InstallFormHeader />

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                4 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires4.duration" />
              <PriceInputField name="tires4.price" />
              <FlexDiscountInputField name="tires4.flexDiscount" />
            </div>

            <div className="grid grid-cols-4 gap-4  mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                3 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires3.duration" />
              <PriceInputField name="tires3.price" />
              <FlexDiscountInputField name="tires3.flexDiscount" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                2 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires2.duration" />
              <PriceInputField name="tires2.price" />
              <FlexDiscountInputField name="tires2.flexDiscount" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                1 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires1.duration" />
              <PriceInputField name="tires1.price" />
              <FlexDiscountInputField name="tires1.flexDiscount" />
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
