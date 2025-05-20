"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/components/shadcn/form";

import { Tooltip } from "@/components/common/tooltip";
import { installOnlyFormSchema } from "./form.consts";
import PriceInputField from "@/modules/service-pricing/common/components/price-input-field";
import PricingCard from "@/modules/service-pricing/common/components/pricing-card";
import { DurationInputField } from "../../duration-input-field";
import { FlexDiscountInputField } from "../../flex-discount-input-field";
import { InstallFormHeader } from "../../header";
import { useTerritory } from "@/contexts/territory-context";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  getServiceByTerritory,
  submitTripCharge,
  updateTripCharge,
} from "@/modules/service-pricing/actions";
import { TyreType } from "@/lib/data/service-pricing";

export default function InstallOnlyForm() {
  const { selectedTerritory } = useTerritory();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const allDefaultValues = {
    tires4: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires5: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires6: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires8: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
  };

  const form = useForm<z.infer<typeof installOnlyFormSchema>>({
    resolver: zodResolver(installOnlyFormSchema),
  });

  const getTripServices = async () => {
    const tripServices = await getServiceByTerritory(
      selectedTerritory?.id || 0,
      "Install"
    );
    const services = tripServices.docs;

    const existingValues = services.reduce(
      (
        acc: Record<
          string,
          {
            duration: number;
            price: number;
            flexDiscount: number;
            serviceId: number;
          }
        >,
        service
      ) => {
        if (service.tyre_type) {
          acc[`tires${service.tyre_type}`] = {
            duration:
              typeof service.duration === "string"
                ? parseFloat(service.duration)
                : (service.duration ?? 0),
            price:
              typeof service.price === "string"
                ? parseFloat(service.price)
                : (service.price ?? 0),
            flexDiscount:
              typeof service.discount === "string"
                ? parseFloat(service.discount)
                : (service.discount ?? 0),
            serviceId: service.id,
          };
        }
        return acc;
      },
      {}
    );

    const defaultValues = { ...allDefaultValues, ...existingValues };

    form.reset(defaultValues);
  };

  useEffect(() => {
    getTripServices();
  }, [selectedTerritory?.id, form]);

  async function onSubmit(values: z.infer<typeof installOnlyFormSchema>) {
    setIsLoading(true);

    try {
      for (const tireType of Object.keys(values)) {
        const installValue = values[tireType as keyof typeof values];

        const tireNumber = tireType.replace("tires", "");

        if (installValue.serviceId !== 0) {
          await updateTripCharge({
            price: installValue.price,
            territory_id: selectedTerritory?.id || 1,
            service: "Install",
            tyre_type: tireNumber as TyreType,
            duration: installValue.duration,
            discount: installValue.flexDiscount,
            serviceId: installValue.serviceId,
          });
        } else {
          await submitTripCharge({
            price: installValue.price,
            territory_id: selectedTerritory?.id || 1,
            service: "Install",
            tyre_type: tireNumber as TyreType,
            duration: installValue.duration,
            discount: installValue.flexDiscount,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error updating install pricing",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            isLoading={isLoading}
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
