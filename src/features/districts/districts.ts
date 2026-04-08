import { z } from "zod";

export const districtValues = {
  name: {
    ru: "",
    uz: "",
  },
  regionId: null,
};

export const createDistrictSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.districtNameRequired")),
      uz: z.string().min(1, t("required.districtNameRequired")),
    }),
    regionId: z.number({
      required_error: t("required.regionRequired"),
      invalid_type_error: t("required.regionRequired"),
    }),
  });

export type DistrictSchema = z.infer<ReturnType<typeof createDistrictSchema>>;
