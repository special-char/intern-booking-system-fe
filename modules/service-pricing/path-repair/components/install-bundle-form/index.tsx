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
import { InfoIcon } from "lucide-react";

import PricingCard from "../pricing-card";
import {
  installBundleFormSchema,
  installBundleFormDefaultValues,
} from "./install-bundle-form.consts";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import PriceInputField from "../common/price-input-field";

export default function InstallBundleForm() {
  const form = useForm<z.infer<typeof installBundleFormSchema>>({
    resolver: zodResolver(installBundleFormSchema),
    defaultValues: installBundleFormDefaultValues,
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
            <div className="grid grid-cols-4 gap-4 mb-1 font-semibold">
              <p></p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Job Duration (min){" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Price{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
              <p className="text-xs text-text-secondary flex items-center justify-between">
                Flex Discount{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                4 Tires
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                3 Tires
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormField
                control={form.control}
                name="tires3Duration"
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
              <PriceInputField name="tires3Price" />
              <FormField
                control={form.control}
                name="tires3FlexDiscount"
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
                2 Tires
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormField
                control={form.control}
                name="tires2Duration"
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
              <PriceInputField name="tires2Price" />
              <FormField
                control={form.control}
                name="tires2FlexDiscount"
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
                1 Tire
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-3 h-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a tooltip. It will display additional information
                      about the item.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormField
                control={form.control}
                name="tires1Duration"
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
              <PriceInputField name="tires1Price" />
              <FormField
                control={form.control}
                name="tires1FlexDiscount"
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
