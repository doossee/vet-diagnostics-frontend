import { z } from "zod";

export const districtValues = {
  name_ru: "",
  name_uz: "",
  regionId: null,
};

export const createDistrictSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.districtNameRequired")),
    name_uz: z.string().min(1, t("required.districtNameRequired")),
    regionId: z.number({
      required_error: t("required.regionRequired"),
      invalid_type_error: t("required.regionRequired"),
    }),
  });

export type DistrictSchema = z.infer<ReturnType<typeof createDistrictSchema>>;
