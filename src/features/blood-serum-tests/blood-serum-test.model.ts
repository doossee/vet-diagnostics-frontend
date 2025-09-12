import { z } from "zod";
import { BLOOD_SERUM } from "@/shared/types";
import { BLOOD_SERUM_TESTS } from "@/shared/constants";

export const bloodSerumTestValues = (animalId: number | null) => {
  const obj: any = { animalId };

  Object.keys(BLOOD_SERUM_TESTS).map((key) => {
    obj[key] = 0;
  });

  return obj;
};

export const createBloodSerumTestSchema = (t: any, locale: "uz" | "ru") => {
  const formSchemaValues: any = {};

  Object.keys(BLOOD_SERUM_TESTS).map((key) => {
    formSchemaValues[key] = z.coerce.number().min(1, BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale] + " " + t("required.moreThan0"));
  });

  return z.object({
    animalId: z.number({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    ...formSchemaValues,
  });
};

export type BloodSerumTestSchema = z.infer<ReturnType<typeof createBloodSerumTestSchema>>;
