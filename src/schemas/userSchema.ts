import { z } from 'zod'

export const userSchema = z.object({
  id: z.optional(z.number().int()),
  name: z.string().min(1),
  lastName: z.string().min(1)
})
