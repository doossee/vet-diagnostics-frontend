// import { USER_GENDERS_ARRAY } from "@/entities/users/utils/constants/user-genders";
import { z } from "zod";

export const userValues = {
  phone: "",
  email: "",
  // address: "",
  username: "",
  lastName: "",
  password: "",
  firstName: "",
  // gender: USER_GENDERS_ARRAY[0],
  // birthDate: null,
  districtId: null,
  confirmPassword: "",
  // isActive: true
};

export const createUserSchema = (t: any, itemId?: string) =>
  z
    .object({
      phone: z.string().min(8, t("required.phoneRequired")),
      // gender: z.enum(USER_GENDERS_ARRAY).default(USER_GENDERS_ARRAY[0]).optional(),
      // address: z.string().optional(),
      // birthDate: z.date({
      //   required_error: t("required.birthDateRequired"),
      //   invalid_type_error: t("required.birthDateRequired"),
      // }),
      password: z.string().optional(),
      email: z.string().optional(),
      username: z.string().min(1, t("required.genderRequired")),
      lastName: z.string().min(1, t("required.lastNameRequired")),
      firstName: z.string().min(1, t("required.firstNameRequired")),
      districtId: z.string({
        required_error: t("required.districtRequired"),
        invalid_type_error: t("required.districtRequired"),
      }),
      // isActive: z.boolean().default(true).optional(),
      confirmPassword: z.string().optional(),
      // veterinarianId: z.string().nullable().optional(),
    })
    .superRefine((data, ctx) => {
      if (!itemId) {
        if (!data.password?.trim()) {
          ctx.addIssue({
            path: ["password"],
            message: t("required.passwordRequired"),
            code: "custom",
          });
        }
        if (data.password !== data.confirmPassword) {
          ctx.addIssue({
            path: ["confirmPassword"],
            message: t("required.confirmPasswordRequired"),
            code: "custom",
          });
        }
      }
    })
    .transform(({ confirmPassword, ...rest }) => rest);

export type UserSchema = z.infer<ReturnType<typeof createUserSchema>>;
