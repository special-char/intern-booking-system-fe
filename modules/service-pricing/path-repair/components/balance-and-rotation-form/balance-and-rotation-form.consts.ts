import { z } from "zod";

export const balanceAndRotationFormSchema = z.object({
  balanceAndRotationDuration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  balanceAndRotationPrice: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  balanceAndRotationFlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
});

export const balanceAndRotationFormDefaultValues =
  balanceAndRotationFormSchema.parse({
    balanceAndRotationDuration: 310,
    balanceAndRotationPrice: 350,
    balanceAndRotationFlexDiscount: 70,
  });
