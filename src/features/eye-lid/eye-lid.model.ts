import { z } from "zod";
import { MUCOSA_TYPES_ARRAY } from "@/entities/eye-lid/utils/constants/mucosa-types";

export const eyeLidValues = {
  name_ru: "",
  name_uz: "",
  mucosaType: undefined,
  animalTypeId: undefined,
};

export const createEyeLidSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.eyeLidNameRequired")),
    name_uz: z.string().min(1, t("required.eyeLidNameRequired")),
    mucosaType: z.enum(MUCOSA_TYPES_ARRAY),
    animalTypeId: z.string(),
  });

export type EyeLidSchema = z.infer<ReturnType<typeof createEyeLidSchema>>;
