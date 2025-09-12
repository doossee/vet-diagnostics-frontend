import { z } from "zod";

export const animalColorValues = {
  hex: "#000000",
  name: "",
};

export const createAnimalColorSchema = (t: any) =>
  z.object({
    name: z.string().min(1, t("required.colorNameRequired")),
    hex: z.string().optional(),
  });

export type AnimalColorSchema = z.infer<ReturnType<typeof createAnimalColorSchema>>;
