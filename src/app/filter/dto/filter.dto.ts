import { z } from "zod";

export const getFiltersParamsSchema = z.object({
  productCategoryId: z
    .number({
      required_error: "productCategoryId обязательно",
      invalid_type_error: "productCategoryId число",
    })
    .int({ message: "productCategoryId целое число" })
    .positive({ message: "productCategoryId положитлельное число" }),
  characteristicId: z
    .number({
      required_error: "characteristicId обязательно",
      invalid_type_error: "characteristicId число",
    })
    .int({ message: "characteristicId целое число" })
    .positive({ message: "characteristicId положитлельное число" })
    .optional(),
});
export const createFilterBodySchema = z.object({
  productCategoryId: z
    .number({
      required_error: "productCategoryId обязательно",
      invalid_type_error: "productCategoryId число",
    })
    .int({ message: "productCategoryId целое число" })
    .positive({ message: "productCategoryId положитлельное число" }),
  characteristicId: z
    .number({
      required_error: "characteristicId обязательно",
      invalid_type_error: "characteristicId число",
    })
    .int({ message: "characteristicId целое число" })
    .positive({ message: "characteristicId положитлельное число" }),
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});

export const updateFilterBodySchema = z.object({
  title: z
    .string({
      required_error: "Title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
});
