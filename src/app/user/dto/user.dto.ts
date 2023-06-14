import { z } from "zod";

export const createUserBodySchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(6),
  isAdmin: z.boolean().optional(),
});
export const loginUserBodySchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});
export const logoutUserBodySchema = z.object({
  userId: z.number().positive(),
});
export const refreshUserBodySchema = z.object({
  refreshToken: z.string().nonempty(),
});

export type CreateUserInput = z.infer<typeof createUserBodySchema>;
export type LoginUserInput = z.infer<typeof loginUserBodySchema>;
export type LogoutUserInput = z.infer<typeof logoutUserBodySchema>;
export type RefreshUserInput = z.infer<typeof refreshUserBodySchema>;
