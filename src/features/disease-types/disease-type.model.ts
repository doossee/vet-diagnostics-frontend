import { z } from "zod"

export const diseaseTypeValues = {
    name: "",
}

export const createDiseaseTypeSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.typeNameRequired")),
})

export type DiseaseTypeSchema = z.infer<ReturnType<typeof createDiseaseTypeSchema>>