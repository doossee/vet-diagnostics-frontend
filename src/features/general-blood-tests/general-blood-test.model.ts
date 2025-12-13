import { z } from "zod";
import { BLOOD_TEST_FIELDS } from "@/entities/general-blood-tests/utils/constants/blood-test-fields";

export const generalBloodTestValues = (animalId: string | null) => {
  const obj: any = {
    animalId,
    conclusion: "",
  };

  Object.keys(BLOOD_TEST_FIELDS).map((key) => {
    obj[key] = 0;
  });

  return obj;
};

export const createGeneralBloodTestSchema = (t: any, locale: "uz" | "ru") => {
  const formSchemaValues: any = {};

  Object.entries(BLOOD_TEST_FIELDS).map(([key, value]) => {
    formSchemaValues[key] = z.coerce.number().min(1, value[locale] + " " + t("required.moreThan0"));
  });

  return z.object({
    animalId: z.string({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    conclusion: z.string(),
    ...formSchemaValues,
  });
};

export type GeneralBloodTestSchema = z.infer<ReturnType<typeof createGeneralBloodTestSchema>>;
