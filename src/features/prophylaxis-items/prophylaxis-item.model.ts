import { z } from "zod";
import { PROPHYLAXIS_TYPES_ARRAY } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";

export const prophylaxisItemValues = {
  name: {
    ru: "",
    uz: "",
  },
  type: undefined,
};

export const createProphylaxisItemSchema = (_: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, "Введите название на русском языке"),
      uz: z.string().min(1, "Введите название на узбекском языке"),
    }),
    type: z.enum(PROPHYLAXIS_TYPES_ARRAY, {
      required_error: "Выберите cпецифическая профилактики",
      invalid_type_error: "Специфическая профилактики выбран некорректно",
    }),
  });

export type ProphylaxisItemSchema = z.infer<ReturnType<typeof createProphylaxisItemSchema>>;
