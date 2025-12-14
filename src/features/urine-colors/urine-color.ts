import { z } from "zod";

export const urineColorValues = {
  name_ru: "",
  name_uz: "",
  animalTypeId: undefined,
};

export const createUrineColorSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.colorNameRequired")),
    name_uz: z.string().min(1, t("required.colorNameRequired")),
    animalTypeId: z.string().min(1, "Выберите тип животного"),
  });

export type UrineColorSchema = z.infer<ReturnType<typeof createUrineColorSchema>>;
