import { z } from "zod";

export const animalColorValues = {
  name: {
    ru: "",
    uz: "",
  },
};

export const createAnimalColorSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.colorNameRequired")),
      uz: z.string().min(1, t("required.colorNameRequired")),
    }),
  });

export type AnimalColorSchema = z.infer<ReturnType<typeof createAnimalColorSchema>>;
