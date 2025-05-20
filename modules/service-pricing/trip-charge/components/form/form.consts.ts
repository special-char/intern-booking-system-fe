import { z } from "zod";

export const tripChargeFormSchema = z.object({
  tripCharge: z.coerce.number().min(0, {
    message: "Trip charge must be greater than 0.",
  }),
  isTripChargeEnabled: z.boolean().default(false),
  serviceId: z.number().optional(),
});
