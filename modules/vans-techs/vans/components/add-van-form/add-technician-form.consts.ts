import { z } from "zod";
import { Van } from "../van-table/columns";

export const addTechnicianFormSchema = z.object({
  vehicleId: z.string().min(1),
  yearAndMake: z.string().min(1),
  modelTrim: z.string().min(1),
  tireCapacity: z.string().min(1),
});

export const addTechnicianFormDefaultValues = {
  vehicleId: "",
  yearAndMake: "",
  modelTrim: "",
  tireCapacity: "",
};

export const addTechnicianFormInitialValues = (van?: Van) => {
  return {
    vehicleId: van?.vehicleId || "",
    yearAndMake: `${van?.year} ${van?.make}`,
    modelTrim: `${van?.model} ${van?.trim}`,
    tireCapacity: van?.capacity || "",
  };
};
