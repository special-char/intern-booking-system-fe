'use client';

import { useState } from 'react';
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

export default function BrandProfilePage() {
  const [isBrandEditOpen, setIsBrandEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brandLogo: undefined,
      coverImage: undefined,
      themeColors: {
        base: "#000000",
        lighter1: "#333333",
        lighter2: "#666666",
        darker: "#000000",
      },
      fontFamily: "",
    },
  });

  const onSubmit = async (values: BrandFormData) => {
    try {
      setIsSubmitting(true);
      
      // Validate required fields
      if (!values.brandLogo?.file) {
        throw new Error("Brand logo is required");
      }
      if (!values.coverImage?.file) {
        throw new Error("Cover image is required");
      }

      await BrandService.createBrand(values);
      toast({ title: "Brand created successfully" });
      setIsBrandEditOpen(false);
      form.reset();
    } catch (error) {
      console.error('Failed to create brand:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create brand. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle><h1>Brand Profile</h1></CardTitle>
          <Sheet open={isBrandEditOpen} onOpenChange={setIsBrandEditOpen}>
            <SheetTrigger asChild>
              <Button>Add Brand</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Brand Images</SheetTitle>
              </SheetHeader>
              <BrandForm 
                form={form} 
                onSubmit={onSubmit} 
                onCancel={() => {
                  setIsBrandEditOpen(false);
                  form.reset();
                }} 
              />
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <ImagePreview form={form} />
            <ColorPalettePreview form={form} />
            <FontPreview form={form} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 