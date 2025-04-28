import { z } from "zod"

export const inspectionValues = {
    pulse: 0,
    rumination: 0,
    temperature: 0,
    animalId: null,
    conclusion: "",
    type: "MORNING",
    respiratoryRate: 0,
}

export const inspectionValuesWithDisease = {
    pulse: 0,
    rumination: 0,
    temperature: 0,
    animalId: null,
    conclusion: "",
    type: "DISEASE",
    diseaseId: null,
    respiratoryRate: 0,
}

export const createInspectionSchema = (t: any, type: "DISEASE" | "MORNING") => z.object({
    conclusion: z.string().optional(),
    type: z.string().default("DISEASE"),
    diseaseId: z.number().nullable().optional(),
    animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
    pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
    temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
    rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
    respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
})

export type InspectionSchema = z.infer<ReturnType<typeof createInspectionSchema>>