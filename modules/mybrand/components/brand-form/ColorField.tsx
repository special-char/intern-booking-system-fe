import { memo, useState, useCallback, useMemo } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Badge } from "@/components/shadcn/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { HexColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import { getContrastColor } from "../utils";
import { BrandFormData } from "../types";

const ColorField = memo(() => {
  const { control } = useFormContext<BrandFormData>();
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const generateColorSet = useCallback((color: string) => ({
    base: color,
    lighter1: tinycolor(color).lighten(20).toHexString(),
    lighter2: tinycolor(color).lighten(40).toHexString(),
    darker: tinycolor(color).darken(20).toHexString(),
  }), []);

  const handleColorInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    value = value.replace(/[^#0-9A-Fa-f]/g, '');
    if (value.length <= 7) {
      setSelectedColor(value);
    }
  }, []);

  const handleColorPickerClose = useCallback((field: any) => {
    const colorSet = generateColorSet(selectedColor);
    field.onChange(colorSet);
    setIsColorPickerOpen(false);
  }, [selectedColor, generateColorSet]);

  const handleColorReset = useCallback((field: any) => {
    const defaultColorSet = {
      base: "#000000",
      lighter1: tinycolor("#000000").lighten(20).toHexString(),
      lighter2: tinycolor("#000000").lighten(40).toHexString(),
      darker: tinycolor("#000000").darken(20).toHexString(),
    };
    field.onChange(defaultColorSet);
  }, []);

  return (
    <Controller
      control={control}
      name="themeColors"
      render={({ field, fieldState: { error } }) => {
        const colorPickerContent = useMemo(() => (
          <div className="grid gap-4">
            <HexColorPicker 
              color={selectedColor}
              onChange={setSelectedColor}
            />
            <div className="relative">
              <Input
                value={selectedColor}
                onChange={handleColorInputChange}
                maxLength={7}
                className="pl-7 uppercase"
                placeholder="Enter hex code"
              />
              <div 
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border"
                style={{ backgroundColor: selectedColor }}
              />
            </div>
            <Button
              type="button"
              onClick={() => handleColorPickerClose(field)}
            >
              Add
            </Button>
          </div>
        ), [selectedColor, handleColorInputChange, handleColorPickerClose, field]);

        return (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">Theme Colors</label>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {field.value && (
                  <>
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5"
                      style={{ backgroundColor: field.value.base, color: getContrastColor(field.value.base) }}
                    >
                      Base
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5"
                      style={{ backgroundColor: field.value.lighter1, color: getContrastColor(field.value.lighter1) }}
                    >
                      Light 1
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5"
                      style={{ backgroundColor: field.value.lighter2, color: getContrastColor(field.value.lighter2) }}
                    >
                      Light 2
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5"
                      style={{ backgroundColor: field.value.darker, color: getContrastColor(field.value.darker) }}
                    >
                      Dark
                    </Badge>
                  </>
                )}
              </div>
              <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px]"
                    type="button"
                  >
                    Add Color
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  {colorPickerContent}
                </PopoverContent>
              </Popover>
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        );
      }}
    />
  );
});

ColorField.displayName = 'ColorField';

export default ColorField; 