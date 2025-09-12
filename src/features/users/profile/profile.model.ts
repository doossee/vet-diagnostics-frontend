import { z } from "zod";

export const createProfileSchema = (t: any) =>
  z
    .object({
      phone: z.string().min(8, t("required.phoneRequired")),
      gender: z.string().min(1, t("required.genderRequired")),
      address: z.string().optional(),
      birthDate: z.date({
        required_error: t("required.birthDateRequired"),
        invalid_type_error: t("required.birthDateRequired"),
      }),
      password: z.string().optional(),
      lastName: z.string().min(1, t("required.lastNameRequired")),
      firstName: z.string().min(1, t("required.firstNameRequired")),
      middleName: z.string().optional(),
      confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (!!data.password?.trim() && data.password !== data.confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          message: t("required.passwordRequired"),
          code: "custom",
        });
      }
    })
    .transform(({ confirmPassword, ...rest }) => rest);

export type ProfileSchema = z.infer<ReturnType<typeof createProfileSchema>>;
