import { z } from "zod";

export const createManufacturerBodySchema = z.object({
  title: z
    .string({
      required_error: "title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});

export const updateManufacturerBodySchema = z.object({
  title: z
    .string({
      required_error: "title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});

export const addCategoryToManufacturerBodyDTO = z.object({
  productCategoryId: z
    .number({
      required_error: "productCategoryId обязательно",
      invalid_type_error: "productCategoryId число",
    })
    .int({ message: "productCategoryId целое число" })
    .positive({ message: "productCategoryId положитлельное число" }),
});

export const getManufacturersParamsDTO = z.object({
  productCategoryId: z
    .number({
      required_error: "productCategoryId обязательно",
      invalid_type_error: "productCategoryId число",
    })
    .int({ message: "productCategoryId целое число" })
    .positive({ message: "productCategoryId положитлельное число" })
    .optional(),
});
