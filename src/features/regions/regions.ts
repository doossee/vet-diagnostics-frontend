import { z } from "zod";

export const regionValues = {
  name_ru: "",
  name_uz: "",
};

export const createRegionSchema = (t: any) =>
  z.object({
    name_ru: z.string().min(1, t("required.regionNameRequired")),
    name_uz: z.string().min(1, t("required.regionNameRequired")),
  });

export type RegionSchema = z.infer<ReturnType<typeof createRegionSchema>>;
