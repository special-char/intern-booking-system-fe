import { memo } from 'react';
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import { fontFamilies } from "../schema";
import { BrandFormData } from "../types";

const fontOptions = fontFamilies.map((font) => ({
  ...font,
  style: { fontFamily: font.value }
}));

const FontField = memo(() => {
  const { control } = useFormContext<BrandFormData>();

  return (
    <FormField
      control={control}
      name="fontFamily"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Font Family</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={font.style}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

FontField.displayName = 'FontField';

export default FontField; 