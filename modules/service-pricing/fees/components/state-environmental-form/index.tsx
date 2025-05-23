"use client";

import { Form } from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { stateEnvironmentalFormSchema } from "./form.consts";
import { Fees } from "@/types/services/fees";
import PricingCard from "../../../common/components/pricing-card";
import FeeInputField from "../input-field";
import { fetchStateEnvironments } from "@/modules/service-pricing/actions";
import { useEffect, useState } from "react";

// Define the StateEnvironmentalFee type based on your data structure
interface StateFee {
  id: string;
  fee: string;
  description: string;
}

interface StateEnvironmentalData {
  id: number;
  state: string | null | undefined;
  fees: StateFee[] | null | undefined;
}

interface StateEnvironmentalFeeFormProps {
  values?: Pick<Fees, "state">;
}

export default function StateEnvironmentalFeeForm({
  values,
}: StateEnvironmentalFeeFormProps) {
  const [stateData, setStateData] = useState<StateEnvironmentalData[]>([]);

  const form = useForm<z.infer<typeof stateEnvironmentalFormSchema>>({
    resolver: zodResolver(stateEnvironmentalFormSchema),
    defaultValues: values
      ? stateEnvironmentalFormSchema.parse(values)
      : undefined,
  });

  async function environment() {
    const data = await fetchStateEnvironments();
    setStateData(data as StateEnvironmentalData[]);
  }

  useEffect(() => {
    environment();
  }, []);

  function onSubmit(values: z.infer<typeof stateEnvironmentalFormSchema>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PricingCard
            stateEnvironment={true}
            title="State Environmental Fees"
            description="Set the values for the state environmental fees"
          >
            <div className="space-y-3">
              {stateData.length > 0 ? (
                stateData
                  .slice()
                  .sort((a, b) => (a.state || "").localeCompare(b.state || ""))
                  .map((state) => {
                    const value = state.fees
                      ?.map((fee) => `${fee.fee} ${fee.description || ""}`)
                      .join("\n")
                      .replace("$", "");
                    return (
                      <div
                        key={state.id}
                        className="grid grid-cols-2 items-center"
                      >
                        <div className="text-sm text-text-secondary">
                          {state.state || ""}
                        </div>

                        <FeeInputField
                          disabled={true}
                          icon={true}
                          isTextarea={true}
                          name={state.id.toString()}
                          defaultValue={value}
                        />
                      </div>
                    );
                  })
              ) : (
                <div>No data available.</div>
              )}
            </div>
          </PricingCard>
        </form>
      </Form>
    </FormProvider>
  );
}
