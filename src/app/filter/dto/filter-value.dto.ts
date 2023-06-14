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
    .positive({ message: "characteristicId положитлельное число" }),
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

export const getFiltersValueParamsSchema = z.object({
  filterId: z
    .number({
      required_error: "filterId обязательно",
      invalid_type_error: "filterId число",
    })
    .int({ message: "filterId целое число" })
    .positive({ message: "filterId положитлельное число" }),
});
export const createFilterValueBodySchema = z.object({
  filterId: z
    .number({
      required_error: "filterId обязательно",
      invalid_type_error: "filterId число",
    })
    .int({ message: "filterId целое число" })
    .positive({ message: "filterId положитлельное число" }),
  productCharacteristicId: z
    .number({
      required_error: "productCharactersticId обязательно",
      invalid_type_error: "productCharactersticId число",
    })
    .int({ message: "productCharactersticId целое число" })
    .positive({ message: "productCharactersticId положитлельное число" }),
  title: z
    .string({
      required_error: "value обязательное поле",
      invalid_type_error: "value строка",
    })
    .nonempty({ message: "value не может быть пустым" }),
});

export const updateFilterValueBodySchema = z.object({
  productCharacteristicId: z
    .number({
      required_error: "productCharactersticId обязательно",
      invalid_type_error: "productCharactersticId число",
    })
    .int({ message: "productCharactersticId целое число" })
    .positive({ message: "productCharactersticId положитлельное число" })
    .optional(),
  title: z
    .string({
      required_error: "value обязательное поле",
      invalid_type_error: "value строка",
    })
    .nonempty({ message: "value не может быть пустым" })
    .optional(),
});
