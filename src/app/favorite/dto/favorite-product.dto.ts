import { z } from "zod";

export const createFavoriteProductBodySchema = z.object({
  productId: z.number().positive(),
});
