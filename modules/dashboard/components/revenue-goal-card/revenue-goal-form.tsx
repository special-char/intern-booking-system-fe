"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { DialogFooter } from "@/components/shadcn/dialog";
import { FormSchema } from "./revenue-goal-form.consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export default function RevenueGoalForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      revenueGoal: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="revenueGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Revenue goal</FormLabel>
              <FormControl>
                <Input placeholder="$25,000" size="small" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="flex gap-3 pt-6 pb-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen(false)}
            className="flex-1 text-base font-normal"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => setOpen(false)}
            className="flex-1 text-base font-normal bg-indigo-600 hover:bg-indigo-700"
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
