import { z } from "zod";

export const stateEnvironmentalFormSchema = z.object({
  state: z.coerce.number().min(0, {
    message: "State environmental fee must be greater than 0.",
  }),
});
