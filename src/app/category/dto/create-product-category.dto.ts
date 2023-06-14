import { z } from "zod";

export const createProductCategoryBodyDTO = z.object({
  title: z
    .string({
      required_error: "Название обязательно",
    })
    .nonempty("Название не может быть пустым"),
});
