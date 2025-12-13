import { z } from "zod";
import { PROPHYLAXIS_TYPES_ARRAY } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";

export const prophylaxisItemValues = {
  name_uz: "",
  name_ru: "",
  type: undefined,
};

export const createProphylaxisItemSchema = (_: any) =>
  z.object({
    name_ru: z.string(),
    name_uz: z.string(),
    type: z.enum(PROPHYLAXIS_TYPES_ARRAY),
  });

export type ProphylaxisItemSchema = z.infer<ReturnType<typeof createProphylaxisItemSchema>>;
