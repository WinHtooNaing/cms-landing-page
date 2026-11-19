import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().min(7, "Phone number must be at least 7 characters"),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
