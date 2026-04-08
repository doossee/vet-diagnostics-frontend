import { z } from "zod";

export const additionalCrudValues = {
  name: {
    ru: "",
    uz: "",
  },
  numericValue: 0,
  animalTypeId: undefined,
};

export const createAdditionalCrudSchema = (_: any) =>
  z.object({
    numericValue: z.coerce.number().min(0, "Значение не может быть отрицательным"),
    name: z.object({
      ru: z.string().min(1, "Введите название на русском языке"),
      uz: z.string().min(1, "Введите название на узбекском языке"),
    }),
    animalTypeId: z.string().min(1, "Выберите тип животного"),
  });

export type AdditionalCrudSchema = z.infer<ReturnType<typeof createAdditionalCrudSchema>>;

