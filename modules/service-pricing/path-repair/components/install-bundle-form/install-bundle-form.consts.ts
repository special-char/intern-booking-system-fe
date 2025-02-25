import { z } from "zod";

export const installBundleFormSchema = z.object({
  tires4Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires4Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires4FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires3Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires3Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires3FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires2Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires2Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires2FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
  tires1Duration: z.coerce.number().min(0, {
    message: "Number must be greater than 0.",
  }),
  tires1Price: z.coerce.number().min(0, {
    message: "Price must be greater than 0.",
  }),
  tires1FlexDiscount: z.coerce.number().min(0, {
    message: "Flex discount must be greater than 0.",
  }),
});

export const installBundleFormDefaultValues = installBundleFormSchema.parse({
  tires4Duration: 310,
  tires4Price: 350,
  tires4FlexDiscount: 70,
  tires3Duration: 50,
  tires3Price: 100,
  tires3FlexDiscount: 10,
  tires2Duration: 65,
  tires2Price: 350,
  tires2FlexDiscount: 10,
  tires1Duration: 45,
  tires1Price: 0,
  tires1FlexDiscount: 0,
});
