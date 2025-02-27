"use client";

import { profitMarginFormDefaultValues } from "./profit-margin-form.consts";

import { useForm } from "react-hook-form";
import { profitMarginFormSchema } from "./profit-margin-form.consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { z } from "zod";
import { Slider } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";
import { TooltipContent } from "@/components/shadcn/tooltip";
import { TooltipTrigger } from "@/components/shadcn/tooltip";
import { InfoIcon, PercentIcon } from "lucide-react";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { Tooltip } from "@/components/shadcn/tooltip";
import { Card, CardTitle, CardHeader } from "@/components/shadcn/card";
import { Form } from "@/components/shadcn/form";

export default function ProfitMarginForm() {
  const form = useForm<z.infer<typeof profitMarginFormSchema>>({
    resolver: zodResolver(profitMarginFormSchema),
    defaultValues: profitMarginFormDefaultValues,
  });

  function onChange(values: z.infer<typeof profitMarginFormSchema>) {
    console.log(values);
  }

  const profitMargin = form.watch("profitMargin");

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChange)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Profit margin (%)
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set your desired profit margin percentage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <Input
              leftIcon={<PercentIcon size={16} />}
              className="max-w-32 mb-4 mt-1"
              value={profitMargin}
              onChange={(e) =>
                form.setValue("profitMargin", Number(e.target.value))
              }
            />

            <Slider
              value={[profitMargin]}
              onValueChange={(value) => form.setValue("profitMargin", value[0])}
              max={100}
              step={1}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
