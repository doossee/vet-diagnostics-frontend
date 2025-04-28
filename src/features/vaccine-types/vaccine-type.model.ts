import { z } from "zod"

export const vaccineTypeValues = {
    name: "",
}

export const createVaccineTypeSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.typeNameRequired")),
})

export type VaccineTypeSchema = z.infer<ReturnType<typeof createVaccineTypeSchema>>