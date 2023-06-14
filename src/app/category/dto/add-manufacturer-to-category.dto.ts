import { z } from "zod";

export const addManufacturerToCategoryBodyDTO = z.object({
  manufacturerId: z
    .number({
      required_error: "manufacturerId обязательно",
      invalid_type_error: "manufacturerId число",
    })
    .int({ message: "manufacturerId целое число" })
    .positive({ message: "manufacturerId положитлельное число" }),
});
