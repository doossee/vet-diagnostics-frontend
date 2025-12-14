import { z } from "zod";

export const changePasswordDefaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
}

export const changePasswordSchema = (_: any) =>
  z
    .object({
      currentPassword: z
        .string({
          invalid_type_error: "Поле обязательно",
          required_error: "Поле обязательно"
        })
        .min(6, "Текущий пароль должен быть не менее 6 символов"),
      newPassword: z
        .string({
          invalid_type_error: "Поле обязательно",
          required_error: "Поле обязательно"
        })
        .min(6, "Новый пароль должен быть не менее 6 символов"),
      confirmPassword: z.string({
          invalid_type_error: "Поле обязательно",
          required_error: "Поле обязательно"
        }).min(6, "Пароль не менее 6 символов"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    })
    // .transform(({ confirmPassword, ...rest }) => rest);

export type ChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;
