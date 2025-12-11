import { z } from "zod";

export const animalTypeValues = {
  name_ru: "",
  name_uz: "",
  parentId: "",
};

export const createAnimalTypeSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.typeNameRequired")),
    name_uz: z.string().min(1, t("required.typeNameRequired")),
    parentId: z.string().optional(),
  });

export type AnimalTypeSchema = z.infer<ReturnType<typeof createAnimalTypeSchema>>;
