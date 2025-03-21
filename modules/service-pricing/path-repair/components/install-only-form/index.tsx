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
  installOnlyFormSchema,
  installOnlyFormDefaultValues,
} from "./install-only-form.consts";


import PriceInputField from "../common/price-input-field";
import { Tooltip } from "@/components/common/tooltip";

export default function InstallOnlyForm() {
  const form = useForm<z.infer<typeof installOnlyFormSchema>>({
    resolver: zodResolver(installOnlyFormSchema),
    defaultValues: installOnlyFormDefaultValues,
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
                4 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <FormField
                control={form.control}
                name="tires4Duration"
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
              <PriceInputField name="tires4Price" />
              <FormField
                control={form.control}
                name="tires4FlexDiscount"
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

            <div className="grid grid-cols-4 gap-4  mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                5 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <FormField
                control={form.control}
                name="tires5Duration"
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
              <PriceInputField name="tires5Price" />
              <FormField
                control={form.control}
                name="tires5FlexDiscount"
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

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                6 Tires
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <FormField
                control={form.control}
                name="tires6Duration"
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
              <PriceInputField name="tires6Price" />
              <FormField
                control={form.control}
                name="tires6FlexDiscount"
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

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                8 Tire
                <Tooltip>
                  This is a tooltip. It will display additional information
                  about the item.
                </Tooltip>
              </div>

              <FormField
                control={form.control}
                name="tires8Duration"
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
              <PriceInputField name="tires8Price" />
              <FormField
                control={form.control}
                name="tires8FlexDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-right"
                        placeholder="Discount"
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
