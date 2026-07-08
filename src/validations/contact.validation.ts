import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(2).max(50),

  phone: z.string().regex(/^[6-9]\d{9}$/, {
            message: "Invalid phone number",
        }),

  country: z.string().optional(),

  state: z.string(),

  city: z.string(),

  area: z.string().optional(),
});