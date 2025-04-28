import { z } from "zod"

export const generalInspectionValues = {
    colorId: null,
    animalId: null,
    eyelidId: null,
    character: "CALM",
    bodyType: "MEDIUM",
    obesity: "CACHEXIA",
    leatherCoverId: null,
    bodyPosition: "NATURAL",
    bodyStructure: "COARSE",
    
    pulse: 0,
    rumination: 0,
    temperature: 0,
    conclusion: "",
    respiratoryRate: 0,
}

export const createGeneralInspectionSchema = (t: any) => z.object({
    colorId: z.number({ required_error: t("required.colorRequired"), invalid_type_error: t("required.colorRequired") }),
    animalId: z.number({ required_error: t("required.animalRequired"), invalid_type_error: t("required.animalRequired") }),
    eyelidId: z.number({ required_error: t("required.eyeLidRequired"), invalid_type_error: t("required.eyeLidRequired") }),
    leatherCoverId: z.number({ required_error: t("required.leatherCoverRequired"), invalid_type_error: t("required.leatherCoverRequired") }),
    character: z.enum(["MOBILE", "CALM"], { required_error: t("required.customerTypeRequired"), invalid_type_error: t("required.customerTypeRequired") }),
    bodyType: z.enum(["WEAK", "MEDIUM", "STRONG"], { required_error: t("required.bodyTypeRequired"), invalid_type_error: t("required.bodyTypeRequired") }),
    obesity: z.enum(["HIGH","MEDIUM","LOW","LEAN","CACHEXIA"], { required_error: t("required.obesityRequired"), invalid_type_error: t("required.obesityRequired") }),
    bodyPosition: z.enum(["NATURAL", "FORCED", "FORCED_STANDING", "FORCED_LYING", "FORCED_SITTING", "NON_THERAPEUTIC"], { required_error: t("required.bodyPositionRequired"), invalid_type_error: t("required.bodyPositionRequired") }),
    bodyStructure: z.enum(["COARSE", "SLIM", "DENSE", "WEAK"], { required_error: t("required.bodyStructureTypeRequired"), invalid_type_error: t("required.bodyStructureTypeRequired") }),
    pulse: z.coerce.number().min(1, t("required.pulseGreetThan0")),
    temperature: z.coerce.number().min(1, t("required.temperatureThan0")),
    rumination: z.coerce.number().min(1, t("required.ruminationGreetThan0")),
    respiratoryRate: z.coerce.number().min(1, t("required.respiratoryRateGreetThan0")),
    conclusion: z.string(),
})

export type GeneralInspectionSchema = z.infer<ReturnType<typeof createGeneralInspectionSchema>>