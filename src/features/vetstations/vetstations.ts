import { z } from "zod";

export const vetStationValues = {
  name: {
    ru: "",
    uz: "",
  },
  address: "",
  districtId: null,
};

export const createVetStationSchema = (t: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, t("required.vetStationNameRequired")),
      uz: z.string().min(1, t("required.vetStationNameRequired")),
    }),
    address: z.string().min(1, t("required.vetStationAddressRequired")),
    districtId: z.string({
      required_error: t("required.districtRequired"),
      invalid_type_error: t("required.districtRequired"),
    }),
  });

export type VetStationSchema = z.infer<ReturnType<typeof createVetStationSchema>>;
