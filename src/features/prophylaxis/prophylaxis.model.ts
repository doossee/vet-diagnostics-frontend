import { PROPHYLAXIS_TYPES_ARRAY } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { z } from "zod";

export const prophylaxisValues = {
  type: undefined,
  animalId: undefined,
  itemId: undefined,
  detailId: undefined,
  date: undefined
};

export const createProphylaxisSchema = (_: any) =>
  z.object({
    type: z.enum(PROPHYLAXIS_TYPES_ARRAY, {
      required_error: "Выберите cпецифическая профилактики",
      invalid_type_error: "Специфическая профилактики выбран некорректно",
    }),

    animalId: z.string().min(1, "Выберите животное"),

    itemId: z.string().min(1, "Выберите препарат"),

    detailId: z.string().optional(),

    date: z.date({
      required_error: "Выберите дату проведения",
      invalid_type_error: "Дата проведения указана некорректно",
    }),
  });

export type ProphylaxisSchema = z.infer<ReturnType<typeof createProphylaxisSchema>>;
