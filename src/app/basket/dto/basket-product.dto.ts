import { z } from "zod";

export const addBasketProductBodySchema = z.object({
  basketProductId: z.number().positive(),
});
export const removeBasketProductBodySchema = z.object({
  basketProductId: z.number().positive(),
});
export const createBasketProductBodySchema = z.object({
  productId: z.number().positive(),
});

export type AddBasketProductInput = z.infer<typeof addBasketProductBodySchema>;
export type RemoveBasketProductInput = z.infer<
  typeof removeBasketProductBodySchema
>;
export type CreateBasketProductInput = z.infer<
  typeof createBasketProductBodySchema
>;
