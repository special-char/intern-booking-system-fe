import { z } from "zod";

export const tireDetailsFormSchema = z.object({
  brand: z.string().min(1, {
    message: "Brand is required.",
  }),
  model: z.string().min(1, {
    message: "Model is required.",
  }),
  size: z.string().min(1, {
    message: "Size is required.",
  }),
  sku: z.string().min(1, {
    message: "SKU is required.",
  }),
  cost: z.coerce.number().min(0, {
    message: "Cost must be greater than 0.",
  }),
  profit: z.coerce.number().min(0, {
    message: "Profit must be greater than 0.",
  }),
});

export const tireDetailsFormDefaultValues = (tire: {
  brand: string;
  model: string;
  size: string;
  sku: string;
  cost: number;
  profit: number;
}) => {
  return {
    brand: tire.brand,
    model: tire.model,
    size: tire.size,
    sku: tire.sku,
    cost: tire.cost,
    profit: tire.profit,
  };
};
