import { memo, useMemo } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { fontFamilies } from "../schema";
import { BrandFormData } from "../types";

const FontField = memo(() => {
  const { control } = useFormContext<BrandFormData>();

  const fontOptions = useMemo(() => fontFamilies.map((font) => ({
    ...font,
    style: { fontFamily: font.value }
  })), []);

  const selectContent = useMemo(() => (
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
  ), [fontOptions]);

  return (
    <Controller
      control={control}
      name="fontFamily"
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Family</label>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            {selectContent}
          </Select>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
});

FontField.displayName = 'FontField';

export default FontField; 