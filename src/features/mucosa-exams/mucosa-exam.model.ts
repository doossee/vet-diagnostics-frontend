import { z } from "zod";
import { MUCOSA_TYPES_ARRAY } from "@/entities/eye-lid/utils/constants/mucosa-types";

export const mucosaExamValues = {
  mucosaType: undefined,
  animalTypeId: undefined,
  mucosaAppearanceId: undefined,
};

export const createMucosaExamSchema = (_: any) =>
  z.object({
    animalId: z.string().min(1, "Выберите животное"),
    mucosaAppearanceId: z.string().min(1, "Выберите внешний вид слизистой"),
    mucosaType: z.enum(MUCOSA_TYPES_ARRAY, {
      required_error: "Выберите тип слизистой",
      invalid_type_error: "Тип слизистой выбран некорректно",
    }),
  });

export type MucosaExamSchema = z.infer<ReturnType<typeof createMucosaExamSchema>>;
