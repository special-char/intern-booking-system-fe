import { z } from "zod";

export const technicianFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  mobilePhone: z
    .string()
    .min(1, { message: "Mobile phone is required" })
    .regex(/^\d+$/, { message: "Only numeric values are allowed" }),
  twilioPhone: z
    .string()
    .regex(/^\d+$/, { message: "Only numeric values are allowed" })
    .optional(),
  profilePhoto: z
    .any(),
  assignMobileTireVan: z.string().optional(),
  mobileTireVan: z.array(z.number()).default([]),
});

export const technicianFormDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  mobilePhone: "",
  twilioPhone: "",
  profilePhoto: undefined, // should be assigned a File object later
  assignMobileTireVan: "",
  mobileTireVan: [],
};
