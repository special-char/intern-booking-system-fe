"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/shadcn/form";
import { Tooltip } from "@/components/common/tooltip";
import { balanceRotationFormSchema } from "./form.consts";
import PriceInputField from "../../../common/components/price-input-field";
import PricingCard from "../../../common/components/pricing-card";
import { DurationInputField } from "../../../install/components/duration-input-field";
import { FlexDiscountInputField } from "../../../install/components/flex-discount-input-field";
import { InstallFormHeader } from "../../../install/components/header";
import { useEffect } from "react";
import { useTerritory } from "@/contexts/territory-context";
import { useToast } from "@/hooks/use-toast";
import {
  getServiceByTerritory,
  submitService,
  changeService,
} from "@/modules/service-pricing/actions";

export default function BalanceRotationForm() {
  const { selectedTerritory, applyToAllTerritories, territories } =
    useTerritory();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof balanceRotationFormSchema>>({
    resolver: zodResolver(balanceRotationFormSchema),
    defaultValues: {
      duration: 0,
      price: 0,
      flexDiscount: 0,
      serviceId: 0,
    },
  });

  useEffect(() => {
    async function getBalanceRotationServices() {
      if (!selectedTerritory?.id) return;

      const services = await getServiceByTerritory(
        selectedTerritory.id,
        "Balance & Rotation"
      );
      const serviceData = services.docs[0];

      if (serviceData) {
        form.reset({
          duration: Number(serviceData.duration) || 0,
          price: serviceData.price || 0,
          flexDiscount: serviceData.discount || 0,
          serviceId: serviceData.id || 0,
        });
      } else {
        // Reset form to default values when no service exists for territory
        form.reset({
          duration: 0,
          price: 0,
          flexDiscount: 0,
          serviceId: 0,
        });
      }
    }

    getBalanceRotationServices();
  }, [selectedTerritory?.id, form]);

  async function handleServiceUpdate(
    territoryId: number,
    values: z.infer<typeof balanceRotationFormSchema>,
    existingServiceId?: number
  ) {
    const serviceData = {
      price: values.price,
      territory_id: territoryId,
      service: "Balance & Rotation" as const,
      duration: values.duration,
      discount: values.flexDiscount,
    };

    if (existingServiceId) {
      await changeService({
        ...serviceData,
        serviceId: existingServiceId,
      });
      return "updated";
    } else {
      await submitService(serviceData);

      return "created";
    }
  }

  async function onSubmit(values: z.infer<typeof balanceRotationFormSchema>) {
    if (!selectedTerritory?.id && !applyToAllTerritories) {
      toast({
        title: "Please select territory",
        variant: "destructive",
      });
      return;
    }

    if (!applyToAllTerritories) {
      await submitFormValues(values);
    }
  }

  async function submitFormValues(
    values: z.infer<typeof balanceRotationFormSchema>
  ) {
    try {
      const results: string[] = [];

      if (applyToAllTerritories) {
        for (const territory of territories) {
          const territoryServices = await getServiceByTerritory(
            territory.id,
            "Balance & Rotation"
          );
          const existingService = territoryServices.docs[0];

          const result = await handleServiceUpdate(
            territory.id,
            values,
            existingService?.id
          );
          results.push(result);
        }
      } else {
        const result = await handleServiceUpdate(
          selectedTerritory?.id as number,
          values,
          values.serviceId || undefined
        );
        results.push(result);
      }

      const updated = results.includes("updated");
      const created = results.includes("created");

      let message = "Balance & Rotation ";
      if (created && updated) message += "added and updated";
      else if (created) message += "added";
      else if (updated) message += "updated";
      message += " successfully";

      toast({ title: message });
    } catch (error) {
      toast({
        title: `Error with Balance & Rotation: ${error}`,
        variant: "destructive",
      });
    }
  }

  const handleConfirmApplyToAll = async () => {
    const values = form.getValues();
    await submitFormValues(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            isLoading={form.formState.isSubmitting}
            title="Balance & Rotation"
            description="Set the values for the balance & rotation"
            onConfirmApplyToAll={handleConfirmApplyToAll}
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
