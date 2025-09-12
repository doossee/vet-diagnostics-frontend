import { z } from "zod";

export const dungTestValues = {
  worms: 0,
  smell: "NO",
  colorId: null,
  animalId: null,
  consistency: 0,
  form: "LIQUID",
  diseaseId: null,
  clarity: "CLEAR",
};

export const createDungTestSchema = (t: any) =>
  z.object({
    colorId: z.number({
      required_error: t("required.colorRequired"),
      invalid_type_error: t("required.colorRequired"),
    }),
    animalId: z.number({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    diseaseId: z.number({
      required_error: t("required.diseaseRequired"),
      invalid_type_error: t("required.diseaseRequired"),
    }),
    clarity: z.enum(["CLEAR", "NOT_CLEAR"], {
      required_error: t("required.clarityRequired"),
      invalid_type_error: t("required.clarityRequired"),
    }),
    smell: z.enum(["PUNGENT", "WEAK", "HAS", "NO"], {
      required_error: t("required.smellRequired"),
      invalid_type_error: t("required.smellRequired"),
    }),
    form: z.enum(["NORMAL", "SOLID", "LIQUID", "MEDIUM"], {
      required_error: t("required.formRequired"),
      invalid_type_error: t("required.formRequired"),
    }),
    worms: z.coerce.number().min(1, t("required.wormsGreetThan0")),
    consistency: z.coerce.number().min(1, t("required.consistencyGreetThan0")),
  });

export type DungTestSchema = z.infer<ReturnType<typeof createDungTestSchema>>;
