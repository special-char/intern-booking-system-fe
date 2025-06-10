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

export default function BrandProfilePage() {
  const [isBrandEditOpen, setIsBrandEditOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brandLogo: "",
      coverImage: "",
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
      console.log(values);
      toast({ title: "Brand images updated successfully" });
      setIsBrandEditOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Brand Images</SheetTitle>
              </SheetHeader>
              <BrandForm form={form} onSubmit={onSubmit} onCancel={() => setIsBrandEditOpen(false)} />
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