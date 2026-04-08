import { z } from "zod";

export const eyeLidValues = {
  name: {
    ru: "",
    uz: "",
  },
  numericValue: 0,
  mucosaTypeId: undefined,
  animalTypeId: undefined,
};

export const createEyeLidSchema = (t: any) =>
  z.object({
    numericValue: z.coerce.number().min(0, "Значение не может быть отрицательным"),
    name: z.object({
      ru: z.string().min(1, t("required.eyeLidNameRequired")),
      uz: z.string().min(1, t("required.eyeLidNameRequired")),
    }),
    mucosaTypeId: z.string().min(1, "Выберите тип слизистой"),
    animalTypeId: z.string().min(1, "Выберите тип животного"),
  });

export type EyeLidSchema = z.infer<ReturnType<typeof createEyeLidSchema>>;
