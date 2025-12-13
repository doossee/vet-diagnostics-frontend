import { z } from "zod";

export const prophylaxisDetailValues = {
  name_uz: "",
  name_ru: "",
  itemId: undefined,
};

export const createProphylaxisDetailSchema = (_: any) =>
  z.object({
    name_ru: z.string(),
    name_uz: z.string(),
    itemId: z.string(),
  });

export type ProphylaxisDetailSchema = z.infer<ReturnType<typeof createProphylaxisDetailSchema>>;
