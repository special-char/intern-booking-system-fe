"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { z } from "zod";
import { Range } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";
import { TooltipContent } from "@/components/shadcn/tooltip";
import { TooltipTrigger } from "@/components/shadcn/tooltip";
import { InfoIcon, CircleDollarSign } from "lucide-react";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { Tooltip } from "@/components/shadcn/tooltip";
import { Card, CardTitle, CardHeader } from "@/components/shadcn/card";
import {
  rangeProfitFormDefaultValues,
  rangeProfitFormSchema,
} from "./range-profit-form.consts";
import { Form } from "@/components/shadcn/form";

export default function RangeProfitForm() {
  const form = useForm<z.infer<typeof rangeProfitFormSchema>>({
    resolver: zodResolver(rangeProfitFormSchema),
    defaultValues: rangeProfitFormDefaultValues,
  });

  function onChange(values: z.infer<typeof rangeProfitFormSchema>) {
    console.log(values);
  }

  const minProfit = form.watch("minProfit");
  const maxProfit = form.watch("maxProfit");

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChange)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Min/Max Profit ($)
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
            <div className="flex justify-between gap-3 mb-4 mt-1 w-full">
              <Input
                wrapperClassName="w-full"
                leftIcon={<CircleDollarSign size={16} />}
                value={minProfit}
                onChange={(e) =>
                  form.setValue("minProfit", Number(e.target.value))
                }
              />
              <Input
                wrapperClassName="w-full"
                leftIcon={<CircleDollarSign size={16} />}
                value={maxProfit}
                onChange={(e) =>
                  form.setValue("maxProfit", Number(e.target.value))
                }
              />
            </div>

            <Range
              min={0}
              max={100}
              value={[minProfit, maxProfit]}
              onValueChange={(value) => {
                form.setValue("minProfit", value[0]);
                form.setValue("maxProfit", value[1]);
              }}
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
