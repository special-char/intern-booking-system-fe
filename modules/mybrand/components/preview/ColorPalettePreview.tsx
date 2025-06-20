import { PreviewProps } from "../types";
import { getContrastColor } from "../utils";

export function ColorPalettePreview({ form }: PreviewProps) {
  return (
    <div className="col-span-full space-y-2">
      <h3 className="text-sm font-medium text-gray-500">Color Palette</h3>
      <div className="flex flex-col gap-2">
        <div className="flex h-12 rounded-lg overflow-hidden">
          <div 
            className="flex-1 flex items-center justify-center text-xs font-medium"
            style={{ 
              backgroundColor: form.getValues().themeColors.base,
              color: getContrastColor(form.getValues().themeColors.base)
            }}
          >
            Base
          </div>
          <div 
            className="flex-1 flex items-center justify-center text-xs font-medium"
            style={{ 
              backgroundColor: form.getValues().themeColors.lighter1,
              color: getContrastColor(form.getValues().themeColors.lighter1)
            }}
          >
            Light 1
          </div>
          <div 
            className="flex-1 flex items-center justify-center text-xs font-medium"
            style={{ 
              backgroundColor: form.getValues().themeColors.lighter2,
              color: getContrastColor(form.getValues().themeColors.lighter2)
            }}
          >
            Light 2
          </div>
          <div 
            className="flex-1 flex items-center justify-center text-xs font-medium"
            style={{ 
              backgroundColor: form.getValues().themeColors.darker,
              color: getContrastColor(form.getValues().themeColors.darker)
            }}
          >
            Dark
          </div>
        </div>
        <div className="flex text-xs text-gray-500">
          <div className="flex-1 text-center">{form.getValues().themeColors.base}</div>
          <div className="flex-1 text-center">{form.getValues().themeColors.lighter1}</div>
          <div className="flex-1 text-center">{form.getValues().themeColors.lighter2}</div>
          <div className="flex-1 text-center">{form.getValues().themeColors.darker}</div>
        </div>
      </div>
    </div>
  );
} 