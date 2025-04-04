import { z } from "zod";

export const remarksFormSchema = z.object({
  remarks: z.array(
    z.object({
      description: z.string().min(1, { message: "Description is required" }).max(300, { message: "Description must be less than 300 characters" }),
      photos: z.array(z.string()).nullable(),
      new: z.boolean().optional(),
      edit: z.boolean().optional(),
      date: z.string().min(1, { message: "Date is required" }),
    })
  )
})
