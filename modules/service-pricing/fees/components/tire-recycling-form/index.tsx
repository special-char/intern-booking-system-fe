"use client";

import { Form } from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { tireRecyclingFormSchema } from "./form.consts";
import PricingCard from "../../../common/components/pricing-card";
import FeeInputField from "../input-field";
import { useTerritory } from "@/contexts/territory-context";
import { useToast } from "@/hooks/use-toast";
import {
  changeService,
  getServiceByTerritory,
  submitService,
} from "@/modules/service-pricing/actions";
import { useEffect } from "react";
import { Label } from "@/components/shadcn/label";

export default function TireRecyclingFeeForm() {
  const { selectedTerritory, applyToAllTerritories, territories } =
    useTerritory();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tireRecyclingFormSchema>>({
    resolver: zodResolver(tireRecyclingFormSchema),
    defaultValues: {
      tireRecycling: 0,
      serviceId: 0,
    },
  });

  useEffect(() => {
    async function getTireRecyclingServices() {
      if (!selectedTerritory?.id) return;

      const services = await getServiceByTerritory(
        selectedTerritory.id,
        "Fees"
      );
      const serviceData = services.docs[0];

      if (serviceData) {
        form.reset({
          tireRecycling: serviceData.price || 0,
          serviceId: serviceData.id || 0,
        });
      } else {
        // Reset form to default values when no service exists for territory
        form.reset({
          tireRecycling: 0,
          serviceId: 0,
        });
      }
    }

    getTireRecyclingServices();
  }, [selectedTerritory?.id, form]);

  async function handleServiceUpdate(
    territoryId: number,
    price: number,
    existingServiceId?: number
  ) {
    const serviceData = {
      price,
      territory_id: territoryId,
      service: "Fees" as const,
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

  async function onSubmit(values: z.infer<typeof tireRecyclingFormSchema>) {
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
    values: z.infer<typeof tireRecyclingFormSchema>
  ) {
    try {
      const results: string[] = [];

      if (applyToAllTerritories) {
        for (const territory of territories) {
          const territoryServices = await getServiceByTerritory(
            territory.id,
            "Fees"
          );
          const existingService = territoryServices.docs[0];

          const result = await handleServiceUpdate(
            territory.id,
            values.tireRecycling,
            existingService?.id
          );
          results.push(result);
        }
      } else {
        const result = await handleServiceUpdate(
          selectedTerritory?.id as number,
          values.tireRecycling,
          values.serviceId || undefined
        );
        results.push(result);
      }

      const updated = results.includes("updated");
      const created = results.includes("created");

      let message = "Tire recycling fee ";
      if (created && updated) message += "added and updated";
      else if (created) message += "added";
      else if (updated) message += "updated";
      message += " successfully";

      toast({ title: message });
    } catch (error) {
      toast({
        title: `Error with tire recycling fee: ${error}`,
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
            title="Tire Recycling"
            description="Set the values for the tire recycling"
            onConfirmApplyToAll={handleConfirmApplyToAll}
          >
            <div className="flex items-center justify-between">
              <Label>Tire Recycling</Label>
              <FeeInputField name="tireRecycling" />
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
