import { memo, useCallback, useState, useEffect, useMemo } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { BrandFormData } from "../types";

interface ImageFieldProps {
  name: "brandLogo" | "coverImage";
  label: string;
  aspectRatio: "square" | "wide";
}

const ImageField = memo(({ name, label, aspectRatio }: ImageFieldProps) => {
  const { control, setValue, watch, formState: { errors } } = useFormContext<BrandFormData>();
  const [preview, setPreview] = useState<string>("");
  const imageData = watch(name);

  useEffect(() => {
    if (imageData?.file) {
      const objectUrl = URL.createObjectURL(imageData.file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (imageData?.url) {
      setPreview(imageData.url);
      return () => {};
    } else {
      setPreview("");
      return () => {};
    }
  }, [imageData?.file, imageData?.url]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type);
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        console.error('File too large:', file.size);
        return;
      }

      // Clean up previous preview
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }

      // Set the file and a default alt text based on filename
      const altText = file.name.split('.').slice(0, -1).join('.') || file.name;
      setValue(name, {
        file,
        alt: altText
      }, { shouldValidate: true });

      // Create new preview
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);

      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size,
        alt: altText
      });
    }
  }, [name, setValue, preview]);

  const containerClasses = useMemo(() => aspectRatio === 'square' 
    ? "w-20 h-20" 
    : "w-32 h-20", [aspectRatio]);

  const hasError = useMemo(() => 
    errors[name]?.file?.message || errors[name]?.alt?.message,
    [errors, name]
  );

  const imagePreview = useMemo(() => (
    <div className={`${containerClasses} rounded-lg bg-gray-50 border-2 border-dashed ${hasError ? 'border-red-300' : 'border-gray-200'} flex items-center justify-center`}>
      {preview ? (
        <img
          src={preview}
          alt={imageData?.alt || label}
          className={`w-full h-full ${aspectRatio === 'square' ? 'object-contain' : 'object-cover'} rounded-lg`}
        />
      ) : (
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )}
    </div>
  ), [containerClasses, preview, imageData?.alt, label, aspectRatio, hasError]);

  const uploadLabel = useMemo(() => (
    <label 
      htmlFor={`${name}-upload`} 
      className={`flex-1 flex flex-col items-center justify-center h-20 rounded-lg border-2 border-dashed ${hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} hover:bg-gray-100 cursor-pointer transition-colors duration-200`}
    >
      <p className={`text-sm ${hasError ? 'text-red-500' : 'text-gray-500'}`}>
        Click to upload {label.toLowerCase()}
      </p>
      <p className="text-xs text-gray-400 mt-1">Max 5MB, images only</p>
    </label>
  ), [name, hasError, label]);

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name={`${name}.file`}
        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
          <div className="space-y-2">
            <label className={`text-sm font-medium ${hasError ? 'text-red-500' : ''}`}>{label}</label>
            <div className="flex items-center gap-4">
              {imagePreview}
              <input 
                type="file" 
                accept="image/*"
                className="hidden"
                id={`${name}-upload`}
                onChange={handleFileUpload}
                {...field}
              />
              {uploadLabel}
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        control={control}
        name={`${name}.alt`}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">Alt Text</label>
            <Input 
              placeholder={`Describe the ${label.toLowerCase()}`}
              {...field}
              value={field.value || ''}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
});

ImageField.displayName = 'ImageField';

export default ImageField;