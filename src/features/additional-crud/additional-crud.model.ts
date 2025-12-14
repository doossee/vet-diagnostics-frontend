import { z } from "zod";

export const additionalCrudValues = {
  name_ru: "",
  name_uz: "",
  animalTypeId: undefined,
};

export const createAdditionalCrudSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, "Введите название на русском языке"),
    name_uz: z.string().min(1, "Введите название на узбекском языке"),
    animalTypeId: z.string().min(1, "Выберите тип животного"),
  });

export type AdditionalCrudSchema = z.infer<ReturnType<typeof createAdditionalCrudSchema>>;
