import { z } from "zod";

export const generalInspectionValues = {
  animalId: null,
  sessionId: null,

  pulse: 0,
  rumination: 0,
  temperature: 0,
  respiratoryRate: 0,

  bodyTypeId: undefined,
  obesityId: undefined,
  bodyPositionId: undefined,
  constitutionId: undefined,
  temperamentId: undefined,

  woolId: undefined,
  downId: undefined,
  hairId: undefined,
  feathersId: undefined,

  skinColorId: undefined,
  skinHumidityId: undefined,
  skinSmellId: undefined,
  skinTempId: undefined,
  skinSurfaceId: undefined,
  skinElasticityId: undefined,
  skinSensitivityId: undefined,
  skinPainId: undefined,

  lymphSizeId: undefined,
  lymphShapeId: undefined,
  lymphSurfaceId: undefined,
  lymphConsistencyId: undefined,
  lymphTempId: undefined,
  lymphPainId: undefined,
  lymphMobilityId: undefined,
};

export const createGeneralInspectionSchema = (_: any) =>
  z.object({
    animalId: z.string(),
    sessionId: z.string().optional().nullable(),

    pulse: z.coerce.number().min(10, "Пульс: 10–300").max(300, "Пульс: 10–300"),
    rumination: z.coerce.number().min(0, "Жвачка: 0–30").max(30, "Жвачка: 0–30"),
    temperature: z.coerce.number().min(30, "Температура: 30–45").max(45, "Температура: 30–45"),
    respiratoryRate: z.coerce.number().min(1, "Дыхание: 1–150").max(150, "Дыхание: 1–150"),

    bodyTypeId: z.string().optional(),
    obesityId: z.string().optional(),
    bodyPositionId: z.string().optional(),
    constitutionId: z.string().optional(),
    temperamentId: z.string().optional(),

    woolId: z.string().optional(),
    downId: z.string().optional(),
    hairId: z.string().optional(),
    feathersId: z.string().optional(),

    skinColorId: z.string().optional(),
    skinHumidityId: z.string().optional(),
    skinSmellId: z.string().optional(),
    skinTempId: z.string().optional(),
    skinSurfaceId: z.string().optional(),
    skinElasticityId: z.string().optional(),
    skinSensitivityId: z.string().optional(),
    skinPainId: z.string().optional(),

    lymphSizeId: z.string().optional(),
    lymphShapeId: z.string().optional(),
    lymphSurfaceId: z.string().optional(),
    lymphConsistencyId: z.string().optional(),
    lymphTempId: z.string().optional(),
    lymphPainId: z.string().optional(),
    lymphMobilityId: z.string().optional(),

  });

export type GeneralInspectionSchema = z.infer<ReturnType<typeof createGeneralInspectionSchema>>;
