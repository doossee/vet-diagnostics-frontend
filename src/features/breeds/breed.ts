import { z } from "zod";

export const breedValues = {
  name_uz: "",
  name_ru: "",
};

export const createBreedSchema = (t: any) =>
  z.object({
    name_uz: z.string().min(1, t("required.breedNameRequired")),
    name_ru: z.string().min(1, t("required.breedNameRequired")),
  });

export type BreedSchema = z.infer<ReturnType<typeof createBreedSchema>>;
