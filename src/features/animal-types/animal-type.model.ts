import { z } from "zod"

export const animalTypeValues = {
    name: "",
}

export const createAnimalTypeSchema = (t: any) => z.object({
    name: z.string().min(1, t("required.typeNameRequired"))
})

export type AnimalTypeSchema = z.infer<ReturnType<typeof createAnimalTypeSchema>>