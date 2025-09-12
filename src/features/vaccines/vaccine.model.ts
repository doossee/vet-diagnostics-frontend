import { z } from "zod";

export const vaccineValues = {
  date: null,
  typeId: null,
  animalId: null,
};

export const createVaccineSchema = (t: any) =>
  z.object({
    date: z.date({
      required_error: t("required.dateRequired"),
      invalid_type_error: t("required.dateRequired"),
    }),
    typeId: z.number({
      required_error: t("required.vaccineTypeRequired"),
      invalid_type_error: t("required.vaccineTypeRequired"),
    }),
    animalId: z.number({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
  });

export type VaccineSchema = z.infer<ReturnType<typeof createVaccineSchema>>;
