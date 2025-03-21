import { z } from "zod";

export const profitMarginFormSchema = z.object({
  profitMargin: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
});