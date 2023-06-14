import { z } from "zod";

export const getProductCharacteristicParamsSchema = z.object({
  characteristicId: z
    .number({
      required_error: "characteristicId обязательно",
      invalid_type_error: "characteristicId число",
    })
    .int({ message: "characteristicId целое число" })
    .positive({ message: "characteristicId положитлельное число" }),
});

export const createProductCharacteristicBodySchema = z.object({
  characteristicId: z
    .number({
      required_error: "characteristicId обязательно",
      invalid_type_error: "characteristicId число",
    })
    .int({ message: "characteristicId целое число" })
    .positive({ message: "characteristicId положитлельное число" }),
  value: z
    .string({
      required_error: "value обязательное поле",
      invalid_type_error: "value строка",
    })
    .nonempty({ message: "value не может быть пустым" }),
});
export const updateProductCharacteristicBodySchema = z.object({
  value: z
    .string({
      required_error: "value обязательное поле",
      invalid_type_error: "value строка",
    })
    .nonempty({ message: "value не может быть пустым" }),
});
