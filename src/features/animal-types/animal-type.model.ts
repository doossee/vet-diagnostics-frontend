import { z } from "zod";

export const animalTypeValues = {
  name: {
    ru: "",
    uz: "",
  },
  parentId: "",
  modelKey: "",
  sexId: "",
  minAgeMonths: undefined,
  maxAgeMonths: undefined,
};

export const createAnimalTypeSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.typeNameRequired")),
      uz: z.string().min(1, t("required.typeNameRequired")),
    }),
    parentId: z.string().optional(),
    modelKey: z.string().optional(),
    sexId: z.string().optional(),
    minAgeMonths: z.coerce.number().int().min(0).optional(),
    maxAgeMonths: z.coerce.number().int().min(0).optional(),
  });

export type AnimalTypeSchema = z.infer<ReturnType<typeof createAnimalTypeSchema>>;
