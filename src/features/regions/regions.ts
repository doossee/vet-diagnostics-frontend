import { z } from "zod"

export const regionValues = {
    name: "",
}

export const createRegionSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.regionNameRequired")),
})

export type RegionSchema = z.infer<ReturnType<typeof createRegionSchema>>