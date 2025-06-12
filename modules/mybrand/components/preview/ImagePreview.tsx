import { useEffect, useState } from "react";
import { PreviewProps } from "../types";

export function ImagePreview({ form }: PreviewProps) {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");

  useEffect(() => {
    const brandLogo = form.watch('brandLogo');
    console.log('Brand logo data:', brandLogo);
    if (brandLogo?.file) {
      setLogoPreview(URL.createObjectURL(brandLogo.file));
    } else if (brandLogo?.url) {
      console.log('Setting logo preview URL:', brandLogo.url);
      setLogoPreview(brandLogo.url);
    } else {
      setLogoPreview("");
    }

    return () => {
      if (logoPreview && logoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [form.watch('brandLogo')]);

  useEffect(() => {
    const coverImage = form.watch('coverImage');
    console.log('Cover image data:', coverImage);
    if (coverImage?.file) {
      setCoverPreview(URL.createObjectURL(coverImage.file));
    } else if (coverImage?.url) {
      console.log('Setting cover preview URL:', coverImage.url);
      setCoverPreview(coverImage.url);
    } else {
      setCoverPreview("");
    }

    return () => {
      if (coverPreview && coverPreview.startsWith('blob:')) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [form.watch('coverImage')]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Logo */}
      <div className="col-span-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Brand Logo</h3>
        <div className="aspect-square w-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
          {logoPreview ? (
            <img 
              src={logoPreview}
              alt={form.watch('brandLogo.alt') || "Brand logo"}
              className="w-full h-full object-contain"
            />
          ) : (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        {form.watch('brandLogo.alt') && (
          <p className="text-sm text-gray-500 mt-1">
            Alt: {form.watch('brandLogo.alt')}
          </p>
        )}
      </div>

      {/* Cover Image */}
      <div className="col-span-8 space-y-2">
        <h3 className="text-sm font-medium text-gray-500">Cover Image</h3>
        <div className="aspect-[2/1] w-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
          {coverPreview ? (
            <img 
              src={coverPreview}
              alt={form.watch('coverImage.alt') || "Cover image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        {form.watch('coverImage.alt') && (
          <p className="text-sm text-gray-500 mt-1">
            Alt: {form.watch('coverImage.alt')}
          </p>
        )}
      </div>
    </div>
  );
} 