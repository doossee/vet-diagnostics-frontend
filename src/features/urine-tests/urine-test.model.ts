import { z } from "zod";

export const urineTestValues = {
  smell: "NO",
  colorId: null,
  consistency: 0,
  animalId: null,
  diseaseId: null,
  clarity: "CLEAR",
};

export const createUrineTestSchema = (t: any) =>
  z.object({
    clarity: z.enum(["CLEAR", "NOT_CLEAR"], {
      required_error: t("required.clarityRequired"),
      invalid_type_error: t("required.clarityRequired"),
    }),
    smell: z.enum(["PUNGENT", "WEAK", "HAS", "NO"], {
      required_error: t("required.smellRequired"),
      invalid_type_error: t("required.smellRequired"),
    }),
    consistency: z.coerce.number().min(1, t("required.consistencyGreetThan0")),
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
  });

export type UrineTestSchema = z.infer<ReturnType<typeof createUrineTestSchema>>;
