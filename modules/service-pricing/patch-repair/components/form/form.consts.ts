import { z } from "zod";
import { installValueSchema } from "../../../install/components/form/install-schema";

export const patchRepairFormSchema = z.object({
  tires4: installValueSchema,
  tires5: installValueSchema,
  tires6: installValueSchema,
  tires8: installValueSchema,
});
