import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";

import { PriceInput } from "@/components/common/price-input";
import { useFormContext } from "react-hook-form";
import { InputField } from "@/types/form";

interface FeeInputFieldProps extends InputField {
  description?: string;
  defaultValue?: string;
  isTextarea?: boolean;
  disabled?: boolean;
  icon?: boolean;
}

export default function FeeInputField({
  name,
  defaultValue,
  isTextarea,
  disabled,
  icon,
}: FeeInputFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <PriceInput
                disabled={disabled}
                icon={icon}
                isTextarea={isTextarea}
                placeholder={defaultValue || "Recycling Fee per tire"}
                {...field}
                className="text-right"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
