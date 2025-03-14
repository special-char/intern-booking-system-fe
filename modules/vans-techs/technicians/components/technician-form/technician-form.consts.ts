import { z } from "zod";

export const technicianFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  mobilePhone: z.string().min(1, { message: "Mobile phone is required" }),
  twilioPhone: z.string().min(1, { message: "Twilio phone is required" }),
  profilePhoto: z.string().min(1, { message: "Profile photo is required" }),
  assignMobileTireVan: z
    .string()
    .min(1, { message: "Mobile tire van is required" }),
});

export const technicianFormDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  mobilePhone: "",
  twilioPhone: "",
  profilePhoto: "",
  assignMobileTireVan: "",
};
