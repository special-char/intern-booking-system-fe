import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { brandFormSchema } from "./schema";

export type ThemeColors = {
  base: string;
  lighter1: string;
  lighter2: string;
  darker: string;
};

export type BrandFormData = z.infer<typeof brandFormSchema>;

export type BrandFormProps = {
  form: UseFormReturn<BrandFormData>;
  onSubmit: (values: BrandFormData) => Promise<void>;
  onCancel: () => void;
};

export type PreviewProps = {
  form: UseFormReturn<BrandFormData>;
}; 