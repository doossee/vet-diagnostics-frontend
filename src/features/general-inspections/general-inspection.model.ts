import { z } from "zod";
import { DOWN_TYPE_ARRAY, FEATHER_TYPE_ARRAY, HAIR_TYPE_ARRAY, WOOL_TYPE_ARRAY } from "@/entities/general-inspections/utils/constants/skin-cover";
import { SKIN_COLOR_ARRAY, SKIN_ELASTICITY_ARRAY, SKIN_HUMIDITY_ARRAY, SKIN_TEMP_ARRAY } from "@/entities/general-inspections/utils/constants/skin";
import { BODY_TYPE_ARRAY, BODY_POSITION_ARRAY, CONSTITUTION_ARRAY, OBESITY_TYPE_ARRAY, TEMPERAMENT_ARRAY } from "@/entities/general-inspections/utils/constants/habitus";
import { LYMPH_CONSISTENCY_ARRAY, LYMPH_MOBILITY_ARRAY, LYMPH_PAIN_ARRAY, LYMPH_SHAPE_ARRAY, LYMPH_SIZE_ARRAY, LYMPH_SURFACE_ARRAY, LYMPH_TEMP_ARRAY } from "@/entities/general-inspections/utils/constants/lymph";

export const generalInspectionValues = {
  animalId: null,
  pulse: 0,
  rumination: 0,
  temperature: 0,
  respiratoryRate: 0,

  bodyType: undefined,
  obesity: undefined,
  bodyPosition: undefined,
  constitution: undefined,
  temperament: undefined,

  wool: undefined,
  down: undefined,
  hair: undefined,
  feathers: undefined,

  skinColor: undefined,
  skinHumidity: undefined,
  skinSmell: "",
  skinTemp: undefined,
  skinSurface: "",
  skinElasticity: undefined,
  skinSensitivity: "",
  skinPain: "",

  lymphSize: undefined,
  lymphShape: undefined,
  lymphSurface: undefined,
  lymphConsistency: undefined,
  lymphTemp: undefined,
  lymphPain: undefined,
  lymphMobility: undefined,
};

export const createGeneralInspectionSchema = (_: any) =>
  z.object({
    animalId: z.string(),

    pulse: z.coerce.number(),
    rumination: z.coerce.number(),
    temperature: z.coerce.number(),
    respiratoryRate: z.coerce.number(),

    bodyType: z.enum(BODY_TYPE_ARRAY),
    obesity: z.enum(OBESITY_TYPE_ARRAY),
    bodyPosition: z.enum(BODY_POSITION_ARRAY),
    constitution: z.enum(CONSTITUTION_ARRAY),
    temperament: z.enum(TEMPERAMENT_ARRAY),

    wool: z.enum(WOOL_TYPE_ARRAY),
    down: z.enum(DOWN_TYPE_ARRAY),
    hair: z.enum(HAIR_TYPE_ARRAY),
    feathers: z.enum(FEATHER_TYPE_ARRAY),

    skinColor: z.enum(SKIN_COLOR_ARRAY),
    skinHumidity: z.enum(SKIN_HUMIDITY_ARRAY),
    skinSmell: z.string(),
    skinTemp: z.enum(SKIN_TEMP_ARRAY),
    skinSurface: z.string(),
    skinElasticity: z.enum(SKIN_ELASTICITY_ARRAY),
    skinSensitivity: z.string(),
    skinPain: z.string(),

    lymphSize: z.enum(LYMPH_SIZE_ARRAY),
    lymphShape: z.enum(LYMPH_SHAPE_ARRAY),
    lymphSurface: z.enum(LYMPH_SURFACE_ARRAY),
    lymphConsistency: z.enum(LYMPH_CONSISTENCY_ARRAY),
    lymphTemp: z.enum(LYMPH_TEMP_ARRAY),
    lymphPain: z.enum(LYMPH_PAIN_ARRAY),
    lymphMobility: z.enum(LYMPH_MOBILITY_ARRAY),
  });

export type GeneralInspectionSchema = z.infer<ReturnType<typeof createGeneralInspectionSchema>>;
