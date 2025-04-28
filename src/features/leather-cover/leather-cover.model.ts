import { z } from "zod"

export const leatherCoverValues = {
    name: "",
}

export const createLeatherCoverSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.leatherCoverNameRequired")),
})

export type LeatherCoverSchema = z.infer<ReturnType<typeof createLeatherCoverSchema>>