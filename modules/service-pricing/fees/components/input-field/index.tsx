import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";

import { PriceInput } from "@/components/common/price-input";
import { useFormContext } from "react-hook-form";
import { InputField } from "@/types/form";

export default function FeeInputField({ name }: InputField) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between">
          <FormLabel className="mb-0 text-sm text-text-secondary">
            Recycling Fee per tire
          </FormLabel>
          <FormControl>
            <PriceInput
              className="text-right font-medium"
              placeholder="Recycling fee"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
