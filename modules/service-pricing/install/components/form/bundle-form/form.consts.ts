import { z } from "zod";
import { installValueSchema } from "../install-schema";

export const installBundleFormSchema = z.object({
  tires1: installValueSchema,
  tires2: installValueSchema,
  tires3: installValueSchema,
  tires4: installValueSchema,
});
