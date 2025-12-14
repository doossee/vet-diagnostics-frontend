import { z } from "zod";

export const diseaseValues = {
  name_ru: "",
  name_uz: "",
  diseaseCategoryId: undefined,
};

export const createDiseaseSchema = (_: any) =>
  z.object({
    name_ru: z.string({
      required_error: "Введите название болезни на русском языке",
      invalid_type_error: "Название болезни на русском языке должно быть строкой",
    }).min(1, "Название болезни на русском языке не может быть пустым"),

    name_uz: z.string({
      required_error: "Введите название болезни на узбекском языке",
      invalid_type_error: "Название болезни на узбекском языке должно быть строкой",
    }).min(1, "Название болезни на узбекском языке не может быть пустым"),

    diseaseCategoryId: z.string({
      required_error: "Выберите категорию заболевания",
      invalid_type_error: "Категория заболевания указана некорректно",
    }).min(1, "Выберите категорию заболевания"),
  });

export type DiseaseSchema = z.infer<ReturnType<typeof createDiseaseSchema>>;
