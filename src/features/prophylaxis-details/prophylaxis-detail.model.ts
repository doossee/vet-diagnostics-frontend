import { z } from "zod";

export const prophylaxisDetailValues = {
  name_uz: "",
  name_ru: "",
  itemId: undefined,
};

export const createProphylaxisDetailSchema = (_: any) =>
  z.object({
    name_ru: z
      .string()
      .min(1, "Введите название на русском языке"),

    name_uz: z
      .string()
      .min(1, "Введите название на узбекском языке"),

    itemId: z
      .string()
      .min(1, "Выберите препарат"),
  });

export type ProphylaxisDetailSchema = z.infer<ReturnType<typeof createProphylaxisDetailSchema>>;
