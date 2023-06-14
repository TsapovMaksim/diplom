import { z } from "zod";

export const getCharacteristicParamsSchema = z.object({
  typeId: z
    .number({
      required_error: "typeId обязательно",
      invalid_type_error: "typeId число",
    })
    .int({ message: "typeId целое число" })
    .positive({ message: "typeId положитлельное число" }),
});

export const createCharacteristicBodySchema = z.object({
  typeId: z
    .number({
      required_error: "typeId обязательно",
      invalid_type_error: "typeId число",
    })
    .int({ message: "typeId целое число" })
    .positive({ message: "typeId положитлельное число" }),
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});
export const updateCharacteristicBodySchema = z.object({
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});
