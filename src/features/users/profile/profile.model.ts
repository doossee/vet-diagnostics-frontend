import { z } from "zod";

export const createProfileSchema = (t: any) =>
  z
    .object({
         phone: z.string()
      .min(8, t("required.phoneRequired"))
      .max(13, t("required.phoneRequired"))
      .regex(
        /^(?:\+998|998|0)?[3789][0-9]{8}$/,
        "Неверный номер телефона (Узбекистан)"
      ),
      password: z.string()
        .refine((val) => !val || val.length >= 6, {
          message: "Пароль должен быть не менее 6 символов",
        })
        .optional(),
      email: z
        .string()
        .email("Неверный формат email")
        .optional(),
      username: z.string().min(1, "Введите имя пользователя"),
      lastName: z.string().min(1, t("required.lastNameRequired")),
      firstName: z.string().min(1, t("required.firstNameRequired")),
    })

export type ProfileSchema = z.infer<ReturnType<typeof createProfileSchema>>;
