import { z } from "zod";

export const prophylaxisDetailValues = {
  name: {
    ru: "",
    uz: "",
  },
  itemId: undefined,
};

export const createProphylaxisDetailSchema = (_: any) =>
  z.object({
    name: z.object({
      ru: z.string().min(1, "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð° Ñ€ÑƒÑÑÐºÐ¾Ð¼ ÑÐ·Ñ‹ÐºÐµ"),
      uz: z.string().min(1, "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð½Ð° ÑƒÐ·Ð±ÐµÐºÑÐºÐ¾Ð¼ ÑÐ·Ñ‹ÐºÐµ"),
    }),
    itemId: z
      .string()
      .min(1, "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð¿Ñ€ÐµÐ¿Ð°Ñ€Ð°Ñ‚"),
  });

export type ProphylaxisDetailSchema = z.infer<ReturnType<typeof createProphylaxisDetailSchema>>;
