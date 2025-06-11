import { z } from "zod"

// Predefined categories for venues
export const venueCategories = [
  { id: "hotel", label: "Hotel" },
  { id: "restaurant", label: "Restaurant" },
  { id: "conference-hall", label: "Conference Hall" },
  { id: "wedding-venue", label: "Wedding Venue" },
  { id: "resort", label: "Resort" },
  { id: "spa", label: "Spa" },
  { id: "theater", label: "Theater" },
  { id: "stadium", label: "Stadium" },
  { id: "museum", label: "Museum" },
  { id: "art-gallery", label: "Art Gallery" },
  { id: "concert-hall", label: "Concert Hall" },
  { id: "banquet-hall", label: "Banquet Hall" },
  { id: "coworking-space", label: "Coworking Space" },
  { id: "event-space", label: "Event Space" },
]

// Validation schema for venue form
export const venueFormSchema = z.object({
  // Basic Details
  name: z.string().min(1, "Venue name is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  // Address & Contact
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(6, "Valid pincode is required"),
    state: z.string().min(1, "State is required"),
  }),
  phoneNumbers: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(10, "Phone number must be at least 10 digits"),
      }),
    )
    .min(1, "At least one phone number is required"),
  websiteLinks: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().url("Must be a valid URL").startsWith("https://", "URL must use HTTPS"),
      }),
    )
    .optional(),
  photos: z.array(z.instanceof(File)).optional(),

  // Other Details
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  faqs: z
    .array(
      z.object({
        id: z.string(),
        question: z.string().min(5, "Question must be at least 5 characters"),
        answer: z.string().min(5, "Answer must be at least 5 characters"),
      }),
    )
    .optional(),
})

export type VenueFormValues = z.infer<typeof venueFormSchema>

export interface Venue extends VenueFormValues {
  id: string
  createdAt: string
  updatedAt: string
}

export interface StepProps {
  onNext: () => void
  onPrevious?: () => void
}
