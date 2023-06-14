import { z } from "zod";

export const createProductBodySchema = z.object({
  title: z
    .string({
      required_error: "title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" }),
  productCategoryId: z
    .number({
      required_error: "productCategoryId обязательное поле",
      invalid_type_error: "productCategoryId число",
    })
    .positive({ message: "productCategoryId положительное число" }),
});

export const updateProductBodySchema = z.object({
  title: z
    .string({
      required_error: "title обязательное поле",
      invalid_type_error: "title строка",
    })
    .nonempty({ message: "title не может быть пустым" })
    .optional(),
  description: z
    .string({
      required_error: "description обязательное поле",
      invalid_type_error: "description строка",
    })
    .nonempty({ message: "description не может быть пустым" })
    .optional(),
  short_description: z
    .string({
      required_error: "short_description обязательное поле",
      invalid_type_error: "short_description строка",
    })
    .nonempty({ message: "short_description не может быть пустым" })
    .optional(),
  price: z
    .number({
      required_error: "price обязательное поле",
      invalid_type_error: "price число",
    })
    .nonnegative({ message: "price не отрицательное число" })
    .optional(),
  manufacturer: z
    .number({
      required_error: "manufacturer обязательное поле",
      invalid_type_error: "manufacturer число",
    })
    .positive({ message: "manufacturer положительное число" })
    .optional(),
});

export const getCatalogProductsParametersSchema = z.object({
  manufacturer: z.array(z.number()).or(z.number()).optional(),
  category: z.array(z.number()).or(z.number()).optional(),
  mainCategory: z.array(z.number()).or(z.number()).optional(),
  characteristics: z.array(z.number()).or(z.number()).optional(),
  price_min: z.number().nonnegative().optional(),
  price_max: z.number().nonnegative().optional(),
  title: z.string().optional(),
  sort_direction: z.enum(["ASC", "DESC"]).optional(),
  sort_property: z.enum(["price", "raiting", "reviewsCount"]).optional(),
  page: z.number().positive().optional(),
  page_size: z.number().positive().optional(),
});
