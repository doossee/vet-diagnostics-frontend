import { z } from "zod";

export const regionValues = {
  name: {
    ru: "",
    uz: "",
  },
};

export const createRegionSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.regionNameRequired")),
      uz: z.string().min(1, t("required.regionNameRequired")),
    }),
  });

export type RegionSchema = z.infer<ReturnType<typeof createRegionSchema>>;
