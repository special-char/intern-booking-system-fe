import { z } from "zod";
import { installValueSchema } from "../install-schema";

export const installOnlyFormSchema = z.object({
  tires4: installValueSchema,
  tires5: installValueSchema,
  tires6: installValueSchema,
  tires8: installValueSchema,
});
