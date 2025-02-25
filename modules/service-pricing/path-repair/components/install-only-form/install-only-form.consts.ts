import { z } from "zod";

export const installOnlyFormSchema = z.object({
  tires4Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires4Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires4FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires5Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires5Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires5FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires6Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires6Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires6FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires8Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires8Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires8FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
});

export const installOnlyFormDefaultValues = installOnlyFormSchema.parse({
  tires4Duration: 310,
  tires4Price: 350,
  tires4FlexDiscount: 70,
  tires5Duration: 50,
  tires5Price: 100,
  tires5FlexDiscount: 10,
  tires6Duration: 65,
  tires6Price: 350,
  tires6FlexDiscount: 10,
  tires8Duration: 45,
  tires8Price: 0,
  tires8FlexDiscount: 0,
});
