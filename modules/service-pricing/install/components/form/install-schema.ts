import { z } from "zod";

export const installValueSchema = z.object({
  duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  flexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  serviceId: z.number().optional(),
});
