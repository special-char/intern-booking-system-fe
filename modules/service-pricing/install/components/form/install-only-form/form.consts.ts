import { z } from "zod";
import { installValueSchema } from "../install-schema";

export const installOnlyFormSchema = z.object({
  tires4: installValueSchema,
  tires3: installValueSchema,
  tires2: installValueSchema,
  tires1: installValueSchema,
});
