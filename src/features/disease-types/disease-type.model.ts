import { z } from "zod";

export const diseaseTypeValues = {
  name_ru: "",
  name_uz: "",
  parentId: undefined
};

export const createDiseaseTypeSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.typeNameRequired")),
    name_uz: z.string().min(1, t("required.typeNameRequired")),
    parentId: z.string().optional(),
  });

export type DiseaseTypeSchema = z.infer<ReturnType<typeof createDiseaseTypeSchema>>;
