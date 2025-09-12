import { z } from "zod";
import { GENERAL_BLOOD } from "@/shared/types";
import { GENERAL_BLOOD_TESTS } from "@/shared/constants";

export const generalBloodTestValues = (animalId: number | null) => {
  const obj: any = {
    animalId,
    date: null,
    conclusion: "",
  };

  Object.keys(GENERAL_BLOOD_TESTS).map((key) => {
    obj[key] = 0;
  });

  return obj;
};

export const createGeneralBloodTestSchema = (t: any, locale: "uz" | "ru") => {
  const formSchemaValues: any = {};

  Object.keys(GENERAL_BLOOD_TESTS).map((key) => {
    formSchemaValues[key] = z.coerce.number().min(1, GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][locale] + " " + t("required.moreThan0"));
  });

  return z.object({
    date: z.date({
      required_error: t("required.dateRequired"),
      invalid_type_error: t("required.dateRequired"),
    }),
    animalId: z.number({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    conclusion: z.string(),
    ...formSchemaValues,
  });
};

export type GeneralBloodTestSchema = z.infer<ReturnType<typeof createGeneralBloodTestSchema>>;
