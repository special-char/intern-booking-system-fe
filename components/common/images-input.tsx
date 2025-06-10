"use client"

import * as React from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"

interface ImagesInputProps {
  value: string[]
  onChange: (files: string[]) => void
  maxFiles?: number
  className?: string
  disabled?: boolean
}

export function ImagesInput({
  value,
  onChange,
  maxFiles = 5,
  className,
  disabled = false,
}: ImagesInputProps) {
  const [localFilePreviews, setLocalFilePreviews] = React.useState<string[]>([]);
  const localFileObjects = React.useRef<File[]>([]); // To keep track of actual File objects for revocation

  React.useEffect(() => {
    // Cleanup local file object URLs when component unmounts or local files change
    return () => {
      localFileObjects.current.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
      localFileObjects.current = [];
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + value.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const newLocalFilePreviews: string[] = [];
    selectedFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      newLocalFilePreviews.push(url);
      localFileObjects.current.push(file); // Store the actual File object
    });
    setLocalFilePreviews(prevPreviews => [...prevPreviews, ...newLocalFilePreviews]);

    // Convert new files to Data URLs and combine with existing values
    const newCombinedUrls: string[] = [...value]; // Start with existing URLs

    let filesProcessed = 0;
    if (selectedFiles.length === 0) {
      onChange(newCombinedUrls); // No new files, just trigger change with existing
      return;
    }

    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          newCombinedUrls.push(reader.result);
        }
        filesProcessed++;
        if (filesProcessed === selectedFiles.length) {
          onChange(newCombinedUrls); // All new files processed, call onChange
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (indexToRemove: number) => {
    // Filter the value array, which contains all currently persisted URLs (including newly added ones as Data URLs)
    const newValues = value.filter((_, i) => i !== indexToRemove);
    onChange(newValues);

    // Also update local previews if the removed item was a newly selected file
    const removedUrl = value[indexToRemove];
    const removedFileIndex = localFilePreviews.indexOf(removedUrl);
    if (removedFileIndex > -1) {
      URL.revokeObjectURL(removedUrl); // Revoke object URL if it was a local file preview
      setLocalFilePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== removedFileIndex));
      localFileObjects.current = localFileObjects.current.filter((_, i) => i !== removedFileIndex);
    }
  };

  const allImagesForDisplay = [...(value || []), ...localFilePreviews];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {allImagesForDisplay.map((url, index) => (
          <div
            key={url}
            className="group relative aspect-square overflow-hidden rounded-lg border"
          >
            <Image
              src={url}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {allImagesForDisplay.length < maxFiles && (
          <div className="relative aspect-square">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={disabled}
            />
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-gray-600">Click to upload</p>
                <p className="text-xs text-gray-500">
                  {allImagesForDisplay.length} of {maxFiles} images
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 