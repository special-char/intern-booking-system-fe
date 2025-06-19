import { useEffect, useState } from "react";
import { PreviewProps } from "../types";
import { getUser } from "@/lib/data/admin";
import { Tenant } from "@/payload-types";

export function ImagePreview({ form }: PreviewProps) {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [tenantInitials, setTenantInitials] = useState<string>("");

  useEffect(() => {
    const fetchTenantInfo = async () => {
      const { user } = await getUser();
      const tenantName = (user?.tenants?.[0]?.tenant as Tenant)?.name || '';
      const initials = tenantName.split(' ').map(word => word[0]).join('').slice(0, 2);
      setTenantInitials(initials);
    };
    fetchTenantInfo();
  }, []);

  useEffect(() => {
    const brandLogo = form.watch('brandLogo');
    if (brandLogo?.file) {
      setLogoPreview(URL.createObjectURL(brandLogo.file));
    } else if (brandLogo?.url) {
      setLogoPreview(brandLogo.url);
    } else {
      // Generate default SVG logo
      const defaultLogo = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" fill="#1D4ED8" />
          <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="35" font-family="Arial" dy=".3em">
            ${tenantInitials.toUpperCase()}
          </text>
        </svg>
      `;
      setLogoPreview(`data:image/svg+xml;base64,${btoa(defaultLogo)}`);
    }

    return () => {
      if (logoPreview && logoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [form.watch('brandLogo'), tenantInitials]);

  useEffect(() => {
    const coverImage = form.watch('coverImage');
    if (coverImage?.file) {
      setCoverPreview(URL.createObjectURL(coverImage.file));
    } else if (coverImage?.url) {
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
        <div className="aspect-square w-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          {logoPreview ? (
            <img 
              src={logoPreview}
              alt={form.watch('brandLogo.alt') || "Brand logo"}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
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
        <div className="aspect-[2/1] w-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
          {coverPreview ? (
            <img 
              src={coverPreview}
              alt={form.watch('coverImage.alt') || "Cover image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500 mt-2">No cover image selected</p>
              </div>
            </div>
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