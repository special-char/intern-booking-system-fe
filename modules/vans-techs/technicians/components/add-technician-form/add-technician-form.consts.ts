import { z } from "zod";

export const addTechnicianFormSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  mobilePhone: z.string().min(1),
  twilioPhone: z.string().min(1),
  profilePhoto: z.string().min(1),
  assignMobileTireVan: z.string().min(1),
});

export const addTechnicianFormDefaultValues = {
  fullName: "",
  email: "",
  password: "",
  mobilePhone: "",
  twilioPhone: "",
  profilePhoto: "",
  assignMobileTireVan: "",
};
