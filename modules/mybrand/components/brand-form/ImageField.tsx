import { memo, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/form";
import { BrandFormData } from "../types";

interface ImageFieldProps {
  name: "brandLogo" | "coverImage";
  label: string;
  aspectRatio: "square" | "wide";
}

const ImageField = memo(({ name, label, aspectRatio }: ImageFieldProps) => {
  const { control } = useFormContext<BrandFormData>();

  const handleFileUpload = useCallback((field: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(URL.createObjectURL(file));
    }
  }, []);

  const containerClasses = aspectRatio === 'square' 
    ? "w-20 h-20" 
    : "w-32 h-20";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <div className={`${containerClasses} rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center`}>
                {field.value ? (
                  <img
                    src={field.value}
                    alt={label}
                    className={`w-full h-full ${aspectRatio === 'square' ? 'object-contain' : 'object-cover rounded-lg'}`}
                  />
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*"
                className="hidden"
                id={`${name}-upload`}
                onChange={(e) => handleFileUpload(field, e)}
              />
              <label 
                htmlFor={`${name}-upload`} 
                className="flex-1 flex flex-col items-center justify-center h-20 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                <p className="text-sm text-gray-500">Click to upload {label.toLowerCase()}</p>
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

ImageField.displayName = 'ImageField';

export default ImageField; 