import { PriceInput } from "@/components/common/price-input";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { InputField } from "@/types/form";
import { useFormContext } from "react-hook-form";

export function FlexDiscountInputField({ name }: InputField) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PriceInput
              className="text-right font-medium"
              placeholder="Discount"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

