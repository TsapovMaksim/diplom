import { z } from "zod";

export const getBasketQueryParamsSchema = z.object({
  userId: z.number().positive(),
});

export type GetBasketInput = z.infer<typeof getBasketQueryParamsSchema>;
