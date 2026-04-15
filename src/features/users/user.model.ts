// import { USER_GENDERS_ARRAY } from "@/entities/users/utils/constants/user-genders";
import { z } from "zod";

export const userValues = {
  phone: "",
  email: "",
  username: "",
  lastName: "",
  password: "",
  firstName: "",
  districtId: null,
  confirmPassword: "",
  veterinarianId : null,
};

export const createUserSchema = (t: any, itemId?: string) =>
  z
    .object({
      phone: z.string()
        .min(8, t("required.phoneRequired"))
        .max(13, t("required.phoneRequired")),
      password: z.string()
        .refine((val) => !val || val.length >= 6, {
          message: "Пароль должен быть не менее 6 символов",
        })
        .optional(),
      email: z
        .string()
        .email("Неверный формат email")
        .optional()
        .or(z.literal("")),
      username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов"),
      lastName: z.string().min(1, t("required.lastNameRequired")),
      firstName: z.string().min(1, t("required.firstNameRequired")),
      districtId: z.string({
        required_error: t("required.districtRequired"),
        invalid_type_error: t("required.districtRequired"),
      }),
      veterinarianId: z.string().optional().nullable(),
      confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!itemId && !data.password?.trim()) {
        ctx.addIssue({
          path: ["password"],
          message: t("required.passwordRequired"),
          code: "custom",
        });
      }

      // Проверка совпадения confirmPassword, только если password указан
      if (data.password && data.password !== data.confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: t("required.confirmPasswordRequired"),
          code: "custom",
        });
      }
    })
    .transform(({ confirmPassword, password, ...rest }) => itemId ? rest : {...rest, password});

export type UserSchema = z.infer<ReturnType<typeof createUserSchema>>;
