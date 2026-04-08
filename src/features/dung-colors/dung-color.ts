import { z } from "zod";

export const dungColorValues = {
  name: {
    ru: "",
    uz: "",
  },
  numericValue: 0,
  animalTypeId: undefined,
};

export const createDungColorSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.colorNameRequired")),
      uz: z.string().min(1, t("required.colorNameRequired")),
    }),
    numericValue: z.coerce.number().min(0, "Значение не может быть отрицательным"),
    animalTypeId: z.string().min(1, "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ñ‚Ð¸Ð¿ Ð¶Ð¸Ð²Ð¾Ñ‚Ð½Ð¾Ð³Ð¾"),
  });

export type DungColorSchema = z.infer<ReturnType<typeof createDungColorSchema>>;
