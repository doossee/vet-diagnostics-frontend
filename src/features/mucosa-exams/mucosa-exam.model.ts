import { z } from "zod";
import { MUCOSA_TYPES_ARRAY } from "@/entities/eye-lid/utils/constants/mucosa-types";

export const mucosaExamValues = {
  mucosaType: undefined,
  animalTypeId: undefined,
  mucosaAppearanceId: undefined,
};

export const createMucosaExamSchema = (_: any) =>
  z.object({
    animalId: z.string(),
    mucosaAppearanceId: z.string(),
    mucosaType: z.enum(MUCOSA_TYPES_ARRAY),
  });

export type MucosaExamSchema = z.infer<ReturnType<typeof createMucosaExamSchema>>;
