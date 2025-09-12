import { z } from "zod";

export const diseaseValues = {
  typeId: null,
  endTime: null,
  animalId: null,
  conclusion: "",
  startTime: null,
};

export const createDiseaseSchema = (t: any) =>
  z.object({
    endTime: z.date({
      required_error: t("required.endTimeRequired"),
      invalid_type_error: t("required.endTimeRequired"),
    }),
    typeId: z.number({
      required_error: t("required.diseaseTypeRequired"),
      invalid_type_error: t("required.diseaseTypeRequired"),
    }),
    startTime: z.date({
      required_error: t("required.startTimeRequired"),
      invalid_type_error: t("required.startTimeRequired"),
    }),
    animalId: z.number({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    conclusion: z.string(),
  });

export type DiseaseSchema = z.infer<ReturnType<typeof createDiseaseSchema>>;
