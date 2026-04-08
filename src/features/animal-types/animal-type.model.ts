import { z } from "zod";

export const animalTypeValues = {
  name: {
    ru: "",
    uz: "",
  },
  parentId: "",
};

export const createAnimalTypeSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.typeNameRequired")),
      uz: z.string().min(1, t("required.typeNameRequired")),
    }),
    parentId: z.string().optional(),
  });

export type AnimalTypeSchema = z.infer<ReturnType<typeof createAnimalTypeSchema>>;
