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
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Default configurations
const DEFAULT_FONT = 'Inter';
const DEFAULT_LOGO = {
  file: undefined,
  alt: 'Default Brand Logo',
  url: '/images/mybrand/logo.png'
};
const DEFAULT_COVER_IMAGE = {
  file: undefined,
  alt: 'Default Cover Image',
  url: '/images/mybrand/cover.jpg'
};

export default function BrandProfilePage() {
  const [isBrandEditOpen, setIsBrandEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brandLogo: DEFAULT_LOGO,
      coverImage: DEFAULT_COVER_IMAGE,
      themeColors: {
        base: "#000000",
        lighter1: "#333333",
        lighter2: "#666666",
        darker: "#000000",
      },
      fontFamily: DEFAULT_FONT,
    },
  });

  const fetchBrand = useCallback(async () => {
    try {
      setIsLoading(true);
      const brands = await BrandService.getBrands();
      if (brands.docs.length > 0) {
        const brandData = brands.docs[0];
        setBrand(brandData);
        console.log('Brand data from API:', brandData);
        // Map the color palette to our form structure
        const colorPalette = {
          base: brandData.colorPalette.find(c => c.name === 'primary')?.value || '#000000',
          lighter1: brandData.colorPalette.find(c => c.name === 'light1')?.value || '#333333',
          lighter2: brandData.colorPalette.find(c => c.name === 'light2')?.value || '#666666',
          darker: brandData.colorPalette.find(c => c.name === 'dark')?.value || '#000000',
        };

        const formData = {
          themeColors: colorPalette,
          fontFamily: brandData.fontStyle || DEFAULT_FONT,
          brandLogo: {
            file: undefined,
            alt: brandData.logo?.alt || DEFAULT_LOGO.alt,
            url: brandData.logo?.url || DEFAULT_LOGO.url
          },
          coverImage: {
            file: undefined,
            alt: brandData.coverImage?.alt || DEFAULT_COVER_IMAGE.alt,
            url: brandData.coverImage?.url || DEFAULT_COVER_IMAGE.url
          }
        };
        console.log('Form data being set:', formData);
        form.reset(formData);
      } else {
        setBrand(null);
        form.reset({
          brandLogo: DEFAULT_LOGO,
          coverImage: DEFAULT_COVER_IMAGE,
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
  }, [form, toast]);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  const onSubmit = async (values: BrandFormData) => {
    try {
      setIsSubmitting(true);
      
      // Only require images if creating a new brand
      if (!brand) {
        if (!values.brandLogo?.file) {
          throw new Error("Brand logo is required");
        }
        if (!values.coverImage?.file) {
          throw new Error("Cover image is required");
        }
      }

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
      // Fetch updated brand data
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Brand Profile</CardTitle>
          <Sheet open={isBrandEditOpen} onOpenChange={setIsBrandEditOpen}>
            <SheetTrigger asChild>
              <Button disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : brand ? (
                  'Edit Brand'
                ) : (
                  'Add Brand'
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{brand ? 'Edit Brand' : 'Add Brand'}</SheetTitle>
              </SheetHeader>
              <BrandForm 
                form={form} 
                onSubmit={onSubmit} 
                onCancel={() => {
                  setIsBrandEditOpen(false);
                  form.reset({
                    brandLogo: DEFAULT_LOGO,
                    coverImage: DEFAULT_COVER_IMAGE,
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
                    brandLogo: DEFAULT_LOGO,
                    coverImage: DEFAULT_COVER_IMAGE,
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