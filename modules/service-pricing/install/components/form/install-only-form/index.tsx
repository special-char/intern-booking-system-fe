"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  Form,
} from "@/components/shadcn/form";

import { Tooltip } from "@/components/common/tooltip";
import { installOnlyFormSchema } from "./form.consts";
import { InstallOnly } from "@/types/services/install";
import PriceInputField from "@/modules/service-pricing/common/components/price-input-field";
import PricingCard from "@/modules/service-pricing/common/components/pricing-card";
import { DurationInputField } from "../../duration-input-field";
import { FlexDiscountInputField } from "../../flex-discount-input-field";
import { InstallFormHeader } from "../../header";


interface InstallOnlyFormProps {
  values?: InstallOnly
}

export default function InstallOnlyForm({ values }: InstallOnlyFormProps) {
  const form = useForm<z.infer<typeof installOnlyFormSchema>>({
    resolver: zodResolver(installOnlyFormSchema),
    defaultValues: values ? installOnlyFormSchema.parse(values) : undefined,
  });

  function onSubmit(values: z.infer<typeof installOnlyFormSchema>) {
    console.log("Form values:", values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Install Only"
            description="Set the values for the installation only"
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
                5 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires5.duration" />
              <PriceInputField name="tires5.price" />
              <FlexDiscountInputField name="tires5.flexDiscount" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                6 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires6.duration" />
              <PriceInputField name="tires6.price" />
              <FlexDiscountInputField name="tires6.flexDiscount" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                8 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <DurationInputField name="tires8.duration" />
              <PriceInputField name="tires8.price" />
              <FlexDiscountInputField name="tires8.flexDiscount" />
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
