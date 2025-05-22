import { z } from "zod";

export const tireRecyclingFormSchema = z.object({
  tireRecycling: z.coerce.number().min(0, {
    message: "Tire recycling fee must be greater than 0.",
  }),
  serviceId: z.number().optional(),
});
