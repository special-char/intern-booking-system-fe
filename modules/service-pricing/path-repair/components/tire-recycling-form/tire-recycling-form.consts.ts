import { z } from "zod";

export const tireRecyclingFormSchema = z.object({
  recylingFee: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
});

export const tireRecyclingFormDefaultValues = tireRecyclingFormSchema.parse({
  recylingFee: 0,
});
