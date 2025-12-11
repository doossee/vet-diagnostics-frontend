import { z } from "zod";

export const animalColorValues = {
  name_ru: "",
  name_uz: "",
};

export const createAnimalColorSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.colorNameRequired")),
    name_uz: z.string().min(1, t("required.colorNameRequired")),
  });

export type AnimalColorSchema = z.infer<ReturnType<typeof createAnimalColorSchema>>;
