import { z } from "zod";

export const urineTestValues = {
  animalId: undefined,
  sessionId: undefined,
  urineColorId: undefined,

  urineSmellId: undefined,
  urineClarityId: undefined,
  urineConsistencyId: undefined,
  amount: 0,

  ph: 0,
  sugar: 0,
  acetone: 0,
  protein: 0,
  bilirubin: 0,
  urobilinogen: 0,

  leukocytes: 0,
  epithelium: 0,
  erythrocytes: 0,
  saltCrystals: 0,
  microbialBodies: 0,
};

export const createUrineTestSchema = (_: any) =>
  z.object({
    animalId: z.string(),
    sessionId: z.string().optional().nullable(),
    urineColorId: z.string().optional(),

    urineSmellId: z.string().optional(),
    urineClarityId: z.string().optional(),
    urineConsistencyId: z.string().optional(),
    amount: z.coerce.number().optional(),

    ph: z.coerce.number().optional(),
    sugar: z.coerce.number().optional(),
    acetone: z.coerce.number().optional(),
    protein: z.coerce.number().optional(),
    urobilinogen: z.coerce.number().optional(),
    bilirubin: z.coerce.number().optional(),

    leukocytes: z.coerce.number().optional(),
    epithelium: z.coerce.number().optional(),
    erythrocytes: z.coerce.number().optional(),
    saltCrystals: z.coerce.number().optional(),
    microbialBodies: z.coerce.number().optional(),
  });

export type UrineTestSchema = z.infer<ReturnType<typeof createUrineTestSchema>>;
