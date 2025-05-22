"use client";

import PricingCard from "../../../common/components/pricing-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/shadcn/input";
import { FormProvider, useForm } from "react-hook-form";
import { Switch } from "@/components/shadcn/switch";
import { CircleDollarSign } from "lucide-react";
import { tripChargeFormSchema } from "./form.consts";
import { useTerritory } from "@/contexts/territory-context";
import {
  getServiceByTerritory,
  submitService,
  changeService,
} from "../../../actions";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function TripChargeForm() {
  const { selectedTerritory, applyToAllTerritories, territories } =
    useTerritory();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof tripChargeFormSchema>>({
    resolver: zodResolver(tripChargeFormSchema),
    defaultValues: {
      tripCharge: 0,
      isTripChargeEnabled: true,
      serviceId: 0,
    },
  });

  useEffect(() => {
    async function getTripServices() {
      const tripServices = await getServiceByTerritory(
        selectedTerritory?.id || 0,
        "Trip Charge"
      );
      const services = tripServices.docs[0];

      if (services) {
        form.reset({
          tripCharge: services.price || 0,
          isTripChargeEnabled: services.isRefundable === "Yes",
          serviceId: services.id,
        });
      }
    }

    if (selectedTerritory?.id) {
      getTripServices();
    }
  }, [selectedTerritory?.id, form]);

  async function handleServiceUpdate(
    territoryId: number,
    values: z.infer<typeof tripChargeFormSchema>
  ) {
    const isRefundable = values.isTripChargeEnabled ? "Yes" : ("No" as const);

    if (values.serviceId) {
      await changeService({
        price: values.tripCharge,
        isRefundable,
        service: "Trip Charge",
        territory_id: territoryId,
        serviceId: values.serviceId,
      });
      return "updated";
    } else {
      await submitService({
        price: values.tripCharge,
        isRefundable,
        service: "Trip Charge",
        territory_id: territoryId,
      });
      return "created";
    }
  }

  async function onSubmit(values: z.infer<typeof tripChargeFormSchema>) {
    if (!selectedTerritory?.id && !applyToAllTerritories) {
      toast({
        title: "Please select territory",
        variant: "destructive",
      });
      return;
    }

    try {
      if (applyToAllTerritories) {
        const promises = territories.map((territory) =>
          handleServiceUpdate(territory.id, values)
        );
        await Promise.all(promises);

        toast({
          title: `Trip charge ${values.serviceId ? "updated" : "created"} for all territories`,
        });
      } else {
        const result = await handleServiceUpdate(
          selectedTerritory?.id as number,
          values
        );
        toast({
          title: `Trip charge ${result} successfully`,
        });
      }
    } catch (error) {
      toast({
        title: `Error submitting trip charge: ${error}`,
        variant: "destructive",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Minimum Trip Charge"
            description="Non-Refundable Trip Charge"
            isLoading={form.formState.isSubmitting}
          >
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="tripCharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text-secondary">
                      Non-Refundable Trip Charge
                    </FormLabel>
                    <FormControl>
                      <Input
                        leftIcon={
                          <CircleDollarSign className="w-4 h-4 text-icon-fg" />
                        }
                        placeholder="trip charge"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTripChargeEnabled"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        size="large"
                      />
                    </FormControl>
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
