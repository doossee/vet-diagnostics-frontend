import { z } from "zod"

export const urineColorValues = {
    name: "",
}

export const createUrineColorSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.colorNameRequired")),
})

export type UrineColorSchema = z.infer<ReturnType<typeof createUrineColorSchema>>