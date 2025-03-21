import { z } from "zod";

export const rangeProfitFormSchema = z.object({
  minProfit: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  maxProfit: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
});