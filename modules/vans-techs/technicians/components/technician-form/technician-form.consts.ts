import { z } from "zod";

export const managerFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  mobilePhone: z
    .string()
    .min(1, { message: "Mobile phone is required" })
    .regex(/^\d+$/, { message: "Only numeric values are allowed" }),
  profilePhoto: z
    .any(),
  assignMobileTireVan: z.string().optional(),
  mobileTireVan: z.array(z.number()).default([]),
});

export const managerFormDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  mobilePhone: "",
  profilePhoto: undefined, // should be assigned a File object later
  assignMobileTireVan: "",
  mobileTireVan: [],
};
