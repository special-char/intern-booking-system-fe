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
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  getServiceByTerritory,
  submitService,
  changeService,
} from "@/modules/service-pricing/actions";
import { TyreType, ServiceType } from "@/lib/data/service-pricing";
import { Service } from "@/payload-types";

type TireFormValues = {
  duration: number;
  price: number;
  flexDiscount: number;
  serviceId: number;
};

type FormValues = z.infer<typeof installOnlyFormSchema>;

export default function InstallOnlyForm() {
  const { selectedTerritory, applyToAllTerritories, territories } =
    useTerritory();
  const { toast } = useToast();

  const allDefaultValues = {
    tires4: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires3: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires2: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
    tires1: { duration: 0, price: 0, flexDiscount: 0, serviceId: 0 },
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(installOnlyFormSchema),
    defaultValues: allDefaultValues,
  });

  const formatServiceData = (services: Service[]) => {
    return services?.reduce((acc: Record<string, TireFormValues>, service) => {
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
    }, {});
  };

  const getTripServices = async () => {
    if (!selectedTerritory?.id) return;

    const tripServices = await getServiceByTerritory(
      selectedTerritory.id,
      "Install"
    );

    const existingValues = formatServiceData(tripServices.docs);
    form.reset({ ...allDefaultValues, ...existingValues });
  };

  useEffect(() => {
    getTripServices();
  }, [selectedTerritory?.id]);

  const handleServiceUpdate = async (
    territoryId: number,
    tireType: string,
    values: TireFormValues
  ) => {
    const tireNumber = tireType.replace("tires", "") as TyreType;
    const serviceData = {
      price: values.price,
      territory_id: territoryId,
      service: "Install" as ServiceType,
      tyre_type: tireNumber,
      duration: values.duration,
      discount: values.flexDiscount,
    };

    if (values.serviceId !== 0) {
      await changeService({ ...serviceData, serviceId: values.serviceId });
      return "updated";
    } else {
      await submitService(serviceData);
      return "added";
    }
  };

  async function onSubmit(values: FormValues) {
    if (!selectedTerritory?.id && !applyToAllTerritories) {
      toast({ title: "Please select territory", variant: "destructive" });
      return;
    }

    if (!applyToAllTerritories) {
      await submitFormValues(values);
    }
  }

  async function submitFormValues(values: FormValues) {
    const results = { added: false, updated: false };

    try {
      const territoriesToUpdate = applyToAllTerritories
        ? territories
        : [selectedTerritory].filter(Boolean);

      if (territoriesToUpdate.length === 0) {
        throw new Error("No territory selected");
      }

      for (const territory of territoriesToUpdate) {
        for (const tireType of Object.keys(values)) {
          const tireValue = values[tireType as keyof FormValues];

          if (applyToAllTerritories) {
            // For all territories mode, need to check if service exists for each territory
            const territoryServices = await getServiceByTerritory(
              territory?.id as number,
              "Install"
            );
            const tireNumber = tireType.replace("tires", "");

            const existingService = territoryServices.docs.find(
              (service) => service.tyre_type === tireNumber
            );

            const updatedValue = {
              ...tireValue,
              serviceId: existingService?.id || 0,
            };

            const result = await handleServiceUpdate(
              territory?.id as number,
              tireType,
              updatedValue
            );
            results[result] = true;
          } else {
            // For single territory mode
            const result = await handleServiceUpdate(
              territory?.id as number,
              tireType,
              {
                ...tireValue,
                serviceId: tireValue.serviceId || 0,
              }
            );
            results[result] = true;
          }
        }
      }

      if (results.added && results.updated) {
        toast({ title: "Install Only added and updated successfully" });
      } else if (results.added) {
        toast({ title: "Install Only added successfully" });
      } else if (results.updated) {
        toast({ title: "Install Only updated successfully" });
      }
    } catch (error) {
      toast({
        title: `Error updating install only ${error}`,
        variant: "destructive",
      });
    }
  }

  const handleConfirmApplyToAll = async () => {
    const values = form.getValues();
    await submitFormValues(values);
  };

  const tireConfigs = [
    { type: "tires4", label: "4 Tires" },
    { type: "tires3", label: "3 Tires" },
    { type: "tires2", label: "2 Tires" },
    { type: "tires1", label: "1 Tire" },
  ];

  const renderTireRow = (type: string, label: string) => (
    <div className="grid grid-cols-4 gap-4 mb-4" key={type}>
      <div className="flex items-center gap-1 text-sm text-text-secondary">
        {label}
        <Tooltip>
          This is a tooltip. It will display additional information about the
          item.
        </Tooltip>
      </div>
      <DurationInputField name={`${type}.duration`} />
      <PriceInputField name={`${type}.price`} />
      <FlexDiscountInputField name={`${type}.flexDiscount`} />
    </div>
  );

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            isLoading={form.formState.isSubmitting}
            title="Install Only"
            description="Set the values for the installation only"
            onConfirmApplyToAll={handleConfirmApplyToAll}
          >
            <InstallFormHeader />
            {tireConfigs.map((config) =>
              renderTireRow(config.type, config.label)
            )}
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
