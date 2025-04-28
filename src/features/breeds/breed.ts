import { z } from "zod"

export const breedValues = {
    parentId: null,
    name: "",
}

export const createBreedSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.breedNameRequired")),
    parentId: z.coerce.number().nullable()
})

export type BreedSchema = z.infer<ReturnType<typeof createBreedSchema>>