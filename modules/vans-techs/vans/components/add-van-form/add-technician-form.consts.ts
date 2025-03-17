import { z } from "zod";
import { TireVanDTO } from "@/types/tire-vans";

export const addTechnicianFormSchema = z.object({
  vehicleId: z.string().min(1),
  yearAndMake: z.string().min(1),
  modelTrim: z.string().min(1),
  tireCapacity: z.coerce.number().min(1),
});

export const addTechnicianFormDefaultValues = {
  vehicleId: "",
  yearAndMake: "",
  modelTrim: "",
  tireCapacity: 0,
};

export const addTechnicianFormInitialValues = (van?: TireVanDTO) => {
  return {
    vehicleId: van?.vehicleId || "",
    yearAndMake: `${van?.year} ${van?.make}`,
    modelTrim: `${van?.model} ${van?.trim}`,
    tireCapacity: van?.capacity || 0,
  };
};
