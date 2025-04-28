import { z } from "zod"

export const loginValues = {
    phone: "",
    password: "",
}

export const createLoginSchema = (t: any) => z.object({
    phone: z.string().min(1, t('login.phoneRequired')),
    password: z.string().min(6, t('login.passwordRequired')),
})

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>