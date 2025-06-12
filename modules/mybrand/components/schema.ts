import * as z from "zod";

export const fontFamilies = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'lato', label: 'Lato' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'sourcesans', label: 'Source Sans Pro' },
  { value: 'raleway', label: 'Raleway' },
  { value: 'nunito', label: 'Nunito' },
  { value: 'rubik', label: 'Rubik' },
  { value: 'workSans', label: 'Work Sans' },
  { value: 'quicksand', label: 'Quicksand' },
  { value: 'manrope', label: 'Manrope' },
  { value: 'dmsans', label: 'DM Sans' },
  { value: 'urbanist', label: 'Urbanist' },
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'lora', label: 'Lora' },
  { value: 'crimsonPro', label: 'Crimson Pro' },
  { value: 'spectral', label: 'Spectral' },
  { value: 'dmSerif', label: 'DM Serif Display' },
  { value: 'cormorant', label: 'Cormorant' },
  { value: 'josefinSans', label: 'Josefin Sans' },
  { value: 'comfortaa', label: 'Comfortaa' },
  { value: 'righteous', label: 'Righteous' },
  { value: 'bebasNeue', label: 'Bebas Neue' },
  { value: 'pacifico', label: 'Pacifico' },
  { value: 'firaCode', label: 'Fira Code' },
  { value: 'jetBrainsMono', label: 'JetBrains Mono' },
  { value: 'robotomono', label: 'Roboto Mono' }
] as const;

export const brandFormSchema = z.object({
  brandLogo: z.object({
    file: z.instanceof(File).optional(),
    alt: z.string().min(1, "Alt text is required for brand logo"),
    url: z.string().optional()
  }).optional(),
  coverImage: z.object({
    file: z.instanceof(File).optional(),
    alt: z.string().min(1, "Alt text is required for cover image"),
    url: z.string().optional()
  }).optional(),
  themeColors: z.object({
    base: z.string(),
    lighter1: z.string(),
    lighter2: z.string(),
    darker: z.string(),
  }),
  fontFamily: z.string().min(1, "Please select a font family"),
}); 