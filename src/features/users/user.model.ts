import { z } from "zod"

export const userValues = {
    phone: "",
    address: "",
    lastName: "",
    password: "",
    firstName: "",
    middleName: "",
    gender: "MALE",
    birthDate: null,
    districtId: null,
    confirmPassword: "",
}

export const createUserSchema = (t: any, itemId?: number) =>
z.object({
    phone: z.string().min(8, t('required.phoneRequired')),
    gender: z.string().min(1, t('required.genderRequired')),
    address: z.string().optional(),
    birthDate: z.date({ required_error: t('required.birthDateRequired'), invalid_type_error: t('required.birthDateRequired') }),
    password: z.string().optional(),
    lastName: z.string().min(1, t("required.lastNameRequired")),
    firstName: z.string().min(1, t("required.firstNameRequired")),
    districtId: z.number({ required_error: t("required.districtRequired"), invalid_type_error: t("required.districtRequired") }),
    middleName: z.string().optional(),
    confirmPassword: z.string().optional(),
    veterinarianId: z.number().nullable().optional(),
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

export type UserSchema = z.infer<ReturnType<typeof createUserSchema>>