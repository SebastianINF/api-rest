import { z } from 'zod'
export const taskSchema = z.object({
  task: z.string().min(1),
  complete: z.boolean()
})
