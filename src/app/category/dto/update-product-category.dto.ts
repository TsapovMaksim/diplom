import { z } from "zod";

export const updateProductCategoryBodyDTO = z.object({
  title: z
    .string({
      required_error: "Название обязательно",
    })
    .nonempty("Название не может быть пустым"),
});
