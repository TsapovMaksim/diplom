import { z } from "zod";

export const createReviewBodySchema = z.object({
  star: z.number().min(1).max(5),
  text: z.string().nonempty(),
  userId: z.number().positive(),
  productId: z.number().positive(),
});

export const getReviewsQueryParamsSchema = z.object({
  productId: z.number().positive(),
});
