import { FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { InputField } from "@/types/form";
import { useFormContext } from "react-hook-form";

export function DurationInputField({ name }: InputField) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className="text-right font-medium"
              placeholder="Job Duration"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

