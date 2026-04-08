import { z } from "zod";

export const breedValues = {
  name: {
    ru: "",
    uz: "",
  },
};

export const createBreedSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.breedNameRequired")),
      uz: z.string().min(1, t("required.breedNameRequired")),
    }),
  });

export type BreedSchema = z.infer<ReturnType<typeof createBreedSchema>>;
