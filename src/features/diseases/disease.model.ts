import { z } from "zod";

export const diseaseValues = {
  name_ru: "",
  name_uz: "",
  diseaseCategoryId: undefined,
};

export const createDiseaseSchema = (_: any) =>
  z.object({
    name_ru: z.string({}),
    name_uz: z.string({}),
    diseaseCategoryId: z.string({}),
  });

export type DiseaseSchema = z.infer<ReturnType<typeof createDiseaseSchema>>;
