import { z } from "zod";

export const getCharacteristicTypesParamsSchema = z.object({
  categoryId: z
    .number({
      required_error: "categoryId обязательно",
      invalid_type_error: "categoryId число",
    })
    .int({ message: "categoryId целое число" })
    .positive({ message: "categoryId положитлельное число" }),
});

export const createCharacteristicTypeBodySchema = z.object({
  categoryId: z
    .number({
      required_error: "categoryId обязательно",
      invalid_type_error: "categoryId число",
    })
    .int({ message: "categoryId целое число" })
    .positive({ message: "categoryId положитлельное число" }),
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});
export const updateCharacteristicTypeBodySchema = z.object({
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});
