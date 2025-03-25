import { z } from "zod";

export const FormSchema = z.object({
  revenueGoal: z.string().min(2, {
    message: "Revenue goal must be at least 2 characters.",
  }),
});
