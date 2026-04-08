import { z } from "zod";
import { MUCOSA_TYPES_ARRAY } from "@/entities/eye-lid/utils/constants/mucosa-types";

export const mucosaExamValues = {
  sessionId: undefined,
  mucosaTypeId: undefined,
  animalTypeId: undefined,
  mucosaAppearanceId: undefined,
};

export const createMucosaExamSchema = (_: any) =>
  z.object({
    sessionId: z.string().optional().nullable(),
    animalId: z.string().optional().nullable(),
    mucosaAppearanceId: z.string().min(1, "Выберите внешний вид слизистой"),
    mucosaTypeId: z.string().min(1, "Выберите тип слизистой"),
  });

export type MucosaExamSchema = z.infer<ReturnType<typeof createMucosaExamSchema>>;
