import { z } from "zod";

export const urineColorValues = {
  name: {
    ru: "",
    uz: "",
  },
  numericValue: 0,
  animalTypeId: undefined,
};

export const createUrineColorSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.colorNameRequired")),
      uz: z.string().min(1, t("required.colorNameRequired")),
    }),
    numericValue: z.coerce.number().min(0, "Значение не может быть отрицательным"),
    animalTypeId: z.string().min(1, "Выберите тип животного"),
  });

export type UrineColorSchema = z.infer<ReturnType<typeof createUrineColorSchema>>;
