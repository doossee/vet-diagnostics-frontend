import { z } from "zod";

export const additionalCrudValues = {
  name_ru: "",
  name_uz: "",
  animalTypeId: undefined,
};

export const createAdditionalCrudSchema = (t: any) =>
z.object({
  name_ru: z.string().min(1, t("required.colorNameRequired")),
  name_uz: z.string().min(1, t("required.colorNameRequired")),
  animalTypeId: z.string().min(1, t("required.colorNameRequired")),
});

export type AdditionalCrudSchema = z.infer<ReturnType<typeof createAdditionalCrudSchema>>;
