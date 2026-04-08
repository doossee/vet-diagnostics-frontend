import { z } from "zod";
import { BLOOD_TEST_FIELDS } from "@/entities/general-blood-tests/utils/constants/blood-test-fields";
import { LanguageLocales } from "@/shared/types";

export const generalBloodTestValues = (animalId: string | null, sessionId?: string | null) => {
  const obj: any = {
    animalId,
    sessionId,
    conclusion: "",
  };

  Object.keys(BLOOD_TEST_FIELDS).map((key) => {
    obj[key] = 0;
  });

  return obj;
};

export const createGeneralBloodTestSchema = (t: any, locale: LanguageLocales) => {
  const formSchemaValues: any = {};

  Object.entries(BLOOD_TEST_FIELDS).map(([key, value]) => {
    formSchemaValues[key] = z.coerce.number({
      invalid_type_error: value[locale] + " " + "поле обязательно для заполнения",
      required_error: value[locale] + " " + "поле обязательно для заполнения",
    })
    .min(0, value[locale] + " " + "поле должно быть ≥ 0");
  });

  return z.object({
    sessionId: z.string().optional().nullable(),
    animalId: z.string({
      required_error: t("required.animalRequired"),
      invalid_type_error: t("required.animalRequired"),
    }),
    conclusion: z.string(),
    ...formSchemaValues,
  });
};

export type GeneralBloodTestSchema = z.infer<ReturnType<typeof createGeneralBloodTestSchema>>;
