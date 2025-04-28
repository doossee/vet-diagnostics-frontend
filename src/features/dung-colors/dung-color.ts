import { z } from "zod"

export const dungColorValues = {
    name: "",
}

export const createDungColorSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.colorNameRequired")),
})

export type DungColorSchema = z.infer<ReturnType<typeof createDungColorSchema>>