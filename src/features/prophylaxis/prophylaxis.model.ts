import { PROPHYLAXIS_TYPES_ARRAY } from "@/entities/prophylaxis/utils/constants/prophylaxis-types";
import { z } from "zod";

export const prophylaxisValues = {
  type: undefined,
  animalId: undefined,
  itemId: undefined,
  detailId: undefined,
  date: undefined
};

// TODO: names
export const createProphylaxisSchema = (_: any) =>
  z.object({
    type: z.enum(PROPHYLAXIS_TYPES_ARRAY),
    animalId: z.string(),
    itemId: z.string(),
    detailId: z.string().optional(),
    date: z.date(),
  });

export type ProphylaxisSchema = z.infer<ReturnType<typeof createProphylaxisSchema>>;
