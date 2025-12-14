import { z } from "zod";

export const diseaseTypeValues = {
  name_ru: "",
  name_uz: "",
  parentId: undefined
};

export const createDiseaseTypeSchema = (_: any) =>
  z.object({
    name_ru: z.string().min(1, "Введите название заболевания на русском языке"),
    name_uz: z.string().min(1, "Введите название заболевания на узбекском языке"),
    parentId: z.string().optional(),
  });

export type DiseaseTypeSchema = z.infer<ReturnType<typeof createDiseaseTypeSchema>>;
