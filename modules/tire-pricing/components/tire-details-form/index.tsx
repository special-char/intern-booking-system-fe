"use client";

import { SheetTitle } from "@/components/shadcn/sheet";
import { SheetHeader } from "@/components/shadcn/sheet";
import { SheetContent } from "@/components/shadcn/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tireDetailsFormSchema,
  tireDetailsFormDefaultValues,
} from "./consts";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/shadcn/button";

type TireDetailsSheetProps = {
  tire: {
    title: string;
    brand: string;
    model: string;
    size: string;
    sku: string;
    cost: number;
    profit: number;
  };
};

export default function TireDetailsForm({ tire }: TireDetailsSheetProps) {
  const form = useForm<z.infer<typeof tireDetailsFormSchema>>({
    resolver: zodResolver(tireDetailsFormSchema),
    defaultValues: tire ? tireDetailsFormDefaultValues(tire) : {},
  });

  const onSubmit = (values: z.infer<typeof tireDetailsFormSchema>) => {
    console.log(values);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>{tire?.title}</SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-4 space-y-3 h-full flex flex-col pb-5"
        >
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="brand">Brand</Label>
                <FormControl>
                  <Input size="large" placeholder="Brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="model">Model</Label>
                <FormControl>
                  <Input size="large" placeholder="Model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="size">Size</Label>
                <FormControl>
                  <Input size="large" placeholder="Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="sku">SKU</Label>
                <FormControl>
                  <Input size="large" placeholder="SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="cost">Cost</Label>
                <FormControl>
                  <Input size="large" placeholder="Cost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profit"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="profit">Profit</Label>
                <FormControl>
                  <Input size="large" placeholder="Profit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-auto w-full">
            Save
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
}
