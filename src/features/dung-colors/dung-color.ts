import { z } from "zod";

export const dungColorValues = {
  name_ru: "",
  name_uz: "",
  animalTypeId: undefined,
};

export const createDungColorSchema = (t: any) =>
z.object({
  name_ru: z.string().min(1, t("required.colorNameRequired")),
  name_uz: z.string().min(1, t("required.colorNameRequired")),
  animalTypeId: z.string().min(1, t("required.colorNameRequired")),
});

export type DungColorSchema = z.infer<ReturnType<typeof createDungColorSchema>>;
