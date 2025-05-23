import { z } from "zod";
import { installValueSchema } from "../../../install/components/form/install-schema";

export const patchRepairFormSchema = z.object({
  tires4: installValueSchema,
  tires3: installValueSchema,
  tires2: installValueSchema,
  tires1: installValueSchema,
});
