import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),

  meetingPlace: z.string().min(3),

  meetingAt: z.string(),

  selectedContacts: z.array(z.string()).min(1),
});