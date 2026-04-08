import { z } from "zod";

export const diseaseTypeValues = {
  name: {
    ru: "",
    uz: "",
  },
  parentId: undefined
};

export const createDiseaseTypeSchema = (_: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, "Введите название заболевания на русском языке"),
      uz: z.string().min(1, "Введите название заболевания на узбекском языке"),
    }),
    parentId: z.string().optional(),
  });

export type DiseaseTypeSchema = z.infer<ReturnType<typeof createDiseaseTypeSchema>>;
