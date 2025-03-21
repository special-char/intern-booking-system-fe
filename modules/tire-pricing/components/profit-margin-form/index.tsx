"use client";


import { useForm } from "react-hook-form";
import { profitMarginFormSchema } from "./profit-margin-form.consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { z } from "zod";
import { Slider } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";


import { Card, CardTitle, CardHeader } from "@/components/shadcn/card";
import { Form } from "@/components/shadcn/form";
import { Tooltip } from "@/components/common/tooltip";
import { PercentIcon } from "lucide-react";

interface ProfitMarginFormProps {
  margin: number
}

export default function ProfitMarginForm({ margin }: ProfitMarginFormProps) {
  const form = useForm<z.infer<typeof profitMarginFormSchema>>({
    resolver: zodResolver(profitMarginFormSchema),
    defaultValues: profitMarginFormSchema.parse({
      profitMargin: margin,
    }),
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
            <Tooltip>
              <p>Set your desired profit margin percentage</p>
            </Tooltip>
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
