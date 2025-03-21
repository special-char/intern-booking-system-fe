"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { z } from "zod";
import { Range } from "@/components/shadcn/slider";
import { CardContent } from "@/components/shadcn/card";
import { CircleDollarSign } from "lucide-react";

import { Card, CardTitle, CardHeader } from "@/components/shadcn/card";
import {
  rangeProfitFormSchema,
} from "./range-profit-form.consts";
import { Form } from "@/components/shadcn/form";
import { Tooltip } from "@/components/common/tooltip";

interface RangeProfitFormProps {
  minProfit: number;
  maxProfit: number;
}

export default function RangeProfitForm({ minProfit, maxProfit }: RangeProfitFormProps) {
  const form = useForm<z.infer<typeof rangeProfitFormSchema>>({
    resolver: zodResolver(rangeProfitFormSchema),
    defaultValues: rangeProfitFormSchema.parse({ minProfit, maxProfit }),
  });

  function onChange(values: z.infer<typeof rangeProfitFormSchema>) {
    console.log(values);
  }

  const minProfitWatch = form.watch("minProfit");
  const maxProfitWatch = form.watch("maxProfit");

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChange)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Min/Max Profit ($)
            </CardTitle>
            <Tooltip>
              <p>Set your desired profit margin percentage</p>
            </Tooltip>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-3 mb-4 mt-1 w-full">
              <Input
                wrapperClassName="w-full"
                leftIcon={<CircleDollarSign size={16} />}
                value={minProfitWatch}
                onChange={(e) =>
                  form.setValue("minProfit", Number(e.target.value))
                }
              />
              <Input
                wrapperClassName="w-full"
                leftIcon={<CircleDollarSign size={16} />}
                value={maxProfitWatch}
                onChange={(e) =>
                  form.setValue("maxProfit", Number(e.target.value))
                }
              />
            </div>

            <Range
              min={0}
              max={100}
              value={[minProfitWatch, maxProfitWatch]}
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
