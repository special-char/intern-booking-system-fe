'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcn/sheet";
import BrandForm from './brand-form/BrandForm';
import { ImagePreview } from './preview/ImagePreview';
import { ColorPalettePreview } from './preview/ColorPalettePreview';
import { FontPreview } from './preview/FontPreview';
import { brandFormSchema } from './schema';
import type { BrandFormData } from './types';
import { BrandService } from '../services/brand.service';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/data/admin';
import { Tenant } from '@/payload-types';

const DEFAULT_FONT = 'Inter';

// Function to generate default SVG logo
const generateSVGLogo = (initials: string) => {
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1D4ED8" />
      <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="35" font-family="Arial" dy=".3em">
        ${initials.toUpperCase()}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export default function BrandProfilePage() {
  const [isBrandEditOpen, setIsBrandEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const [tenantInitials, setTenantInitials] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchTenantInfo = async () => {
      const { user } = await getUser();
      const tenantName = (user?.tenants?.[0]?.tenant as Tenant)?.name || '';
      const initials = tenantName.split(' ').map(word => word[0]).join('').slice(0, 2);
      setTenantInitials(initials);
    };
    fetchTenantInfo();
  }, []);

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brandLogo: {
        file: undefined,
        alt: 'Default Brand Logo',
        url: generateSVGLogo(tenantInitials),
      },
      coverImage: undefined, // Cover image is optional now
      themeColors: {
        base: "#000000",
        lighter1: "#333333",
        lighter2: "#666666",
        darker: "#000000",
      },
      fontFamily: DEFAULT_FONT,
    },
  });

  useEffect(() => {
    if (tenantInitials) {
      form.reset({
        ...form.getValues(), // Keep existing values
        brandLogo: {
          file: undefined,
          alt: 'Default Brand Logo',
          url: generateSVGLogo(tenantInitials),
        },
      });
    }
  }, [tenantInitials]);

  const fetchBrand = useCallback(async () => {
    try {
      setIsLoading(true);
      const brands = await BrandService.getBrands();
      if (brands.docs.length > 0) {
        const brandData = brands.docs[0];
        setBrand(brandData);

        const colorPalette = {
          base: brandData.colorPalette.find(c => c.name === 'primary')?.value || '#000000',
          lighter1: brandData.colorPalette.find(c => c.name === 'light1')?.value || '#333333',
          lighter2: brandData.colorPalette.find(c => c.name === 'light2')?.value || '#666666',
          darker: brandData.colorPalette.find(c => c.name === 'dark')?.value || '#000000',
        };

        const formData: BrandFormData = {
          themeColors: colorPalette,
          fontFamily: brandData.fontStyle || DEFAULT_FONT,
          brandLogo: {
            file: undefined,
            alt: brandData.logo?.alt || 'Default Brand Logo',
            url: brandData.logo?.url || generateSVGLogo(tenantInitials)
          },
          coverImage: brandData.coverImage ? {
            file: undefined,
            alt: brandData.coverImage?.alt || '',
            url: brandData.coverImage?.url || ''
          } : undefined
        };
        form.reset(formData);
      } else {
        setBrand(null);
        form.reset({
          brandLogo: {
            file: undefined,
            alt: 'Default Brand Logo',
            url: generateSVGLogo(tenantInitials),
          },
          coverImage: undefined,
          themeColors: {
            base: "#000000",
            lighter1: "#333333",
            lighter2: "#666666",
            darker: "#000000",
          },
          fontFamily: DEFAULT_FONT,
        });
      }
    } catch (error) {
      console.error('Failed to fetch brand:', error);
      toast({
        title: "Error",
        description: "Failed to load brand data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [form, toast, tenantInitials]);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  const onSubmit = async (values: BrandFormData) => {
    try {
      setIsSubmitting(true);
      
      if (brand) {
        // Update existing brand
        await BrandService.updateBrand(brand.id, values, router);
        toast({ title: "Brand updated successfully" });
      } else {
        // Create new brand
        await BrandService.createBrand(values, router);
        toast({ title: "Brand created successfully" });
      }
      
      setIsBrandEditOpen(false);
      await fetchBrand();
    } catch (error) {
      console.error('Failed to save brand:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save brand. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <CardTitle className="text-2xl font-bold">My Brand Profile</CardTitle>
          <Sheet open={isBrandEditOpen} onOpenChange={setIsBrandEditOpen}>
            <SheetTrigger asChild>
              <Button>{brand ? "Edit Brand" : "Add Brand"}</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col overflow-y-auto">
              <SheetHeader className="pb-4">
                <SheetTitle>{brand ? "Edit Brand Profile" : "Add New Brand Profile"}</SheetTitle>
              </SheetHeader>
              <BrandForm 
                form={form} 
                onSubmit={onSubmit} 
                onCancel={() => {
                  setIsBrandEditOpen(false);
                  form.reset({
                    brandLogo: {
                      file: undefined,
                      alt: 'Default Brand Logo',
                      url: generateSVGLogo(tenantInitials),
                    },
                    coverImage: undefined,
                    themeColors: {
                      base: "#000000",
                      lighter1: "#333333",
                      lighter2: "#666666",
                      darker: "#000000",
                    },
                    fontFamily: DEFAULT_FONT,
                  });
                }} 
                onResetToDefault={() => {
                  form.reset({
                    brandLogo: {
                      file: undefined,
                      alt: 'Default Brand Logo',
                      url: generateSVGLogo(tenantInitials),
                    },
                    coverImage: undefined,
                    themeColors: {
                      base: "#000000",
                      lighter1: "#333333",
                      lighter2: "#666666",
                      darker: "#000000",
                    },
                    fontFamily: DEFAULT_FONT,
                  });
                }}
              />
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent className="p-6">
          {brand ? (
            <div className="grid grid-cols-1 gap-6">
              <ImagePreview form={form} />
              <ColorPalettePreview form={form} />
              <FontPreview form={form} />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No brand profile found. Click "Add Brand" to create one.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 