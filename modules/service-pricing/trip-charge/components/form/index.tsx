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
  submitTripCharge,
  updateTripCharge,
} from "../../../actions";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function TripChargeForm() {
  const { selectedTerritory } = useTerritory();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof tripChargeFormSchema>>({
    resolver: zodResolver(tripChargeFormSchema),
    defaultValues: {
      tripCharge: 0,
      isTripChargeEnabled: true,
      serviceId: 0,
    },
  });

  const getTripServices = async () => {
    const tripServices = await getServiceByTerritory(
      selectedTerritory?.id || 0,
      "Trip Charge"
    );
    const services = tripServices.docs[0];

    form.reset({
      tripCharge: services?.price || 0,
      isTripChargeEnabled: services?.isRefundable === "Yes" ? true : false,
      serviceId: services?.id,
    });
  };

  useEffect(() => {
    getTripServices();
  }, [selectedTerritory?.id, form]);

  async function onSubmit(values: z.infer<typeof tripChargeFormSchema>) {
    try {
      console.log("values", values);

      if (values.serviceId) {
        setIsLoading(true);
        await updateTripCharge({
          price: values.tripCharge,
          isRefundable: values.isTripChargeEnabled ? "Yes" : "No",
          territory_id: selectedTerritory?.id || 1,
          service: "Trip Charge",
          serviceId: values.serviceId,
        });
        toast({
          title: "Trip charge updated successfully",
        });
        setIsLoading(false);
      } else {
        setIsLoading(true);
        await submitTripCharge({
          price: values.tripCharge,
          isRefundable: values.isTripChargeEnabled ? "Yes" : "No",
          territory_id: selectedTerritory?.id || 1,
          service: "Trip Charge",
        });
        toast({
          title: "Trip charge created successfully",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            title="Minimum Trip Charge"
            description="Non-Refundable Trip Charge"
            isLoading={isLoading}
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
