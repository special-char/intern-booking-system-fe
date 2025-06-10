import { z } from "zod";

export const addCourtFormSchema = z.object({
  name: z.string().min(1, { message: "Court name is required" }),
  description: z.string().optional(),
  maxPlayers: z.number().min(1, { message: "Maximum players is required" }),
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  images: z.array(z.string()).optional(),
  pricing: z.object({
    sport: z.string().optional(),
    day: z.string().optional(),
    timeSlot: z.string().optional(),
    price: z.number().nullable().optional(),
  }),
}).superRefine((data, ctx) => {
  // Now, validate the sport, day, and timeSlot as required only if the pricing object exists and is not null/undefined
  if (data.pricing) {
    if (!data.pricing.sport || data.pricing.sport === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sport type is required",
        path: ["pricing", "sport"],
      });
    }
    if (!data.pricing.day || data.pricing.day === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Day is required",
        path: ["pricing", "day"],
      });
    }
    if (!data.pricing.timeSlot || data.pricing.timeSlot === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Time slot is required",
        path: ["pricing", "timeSlot"],
      });
    }

    // Price is required only if sport, day, AND timeSlot are all explicitly selected (non-empty strings)
    if (data.pricing.sport !== "" && data.pricing.day !== "" && data.pricing.timeSlot !== "") {
      if (data.pricing.price === null || data.pricing.price === undefined || data.pricing.price <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Price is required when a sport, day, and time slot are selected",
          path: ["pricing", "price"],
        });
      }
    }
  }
});

export type AddCourtFormType = z.infer<typeof addCourtFormSchema>;

export const addCourtFormDefaultValues: AddCourtFormType = {
  name: "",
  description: "",
  maxPlayers: 0,
  length: undefined,
  breadth: undefined,
  height: undefined,
  images: [],
  pricing: {
    sport: "",
    day: "",
    timeSlot: "",
    price: null,
  },
};

export const addCourtFormInitialValues = (court: AddCourtFormType): AddCourtFormType => ({
  name: court.name || "",
  description: court.description || "",
  maxPlayers: court.maxPlayers || 0,
  length: court.length || undefined,
  breadth: court.breadth || undefined,
  height: court.height || undefined,
  images: court.images || [],
  pricing: {
    sport: court.pricing?.sport || "",
    day: court.pricing?.day || "",
    timeSlot: court.pricing?.timeSlot || "",
    price: court.pricing?.price || null,
  },
}); 