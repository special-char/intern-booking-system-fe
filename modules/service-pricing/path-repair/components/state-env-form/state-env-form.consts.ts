import { z } from "zod";

export const stateEnvFormSchema = z.object({
  recylingFee: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
});

export const stateEnvFormDefaultValues = stateEnvFormSchema.parse({
  recylingFee: 0,
});
