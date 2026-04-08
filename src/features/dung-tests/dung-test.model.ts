import { z } from "zod";

export const dungTestValues = {
  amount: 0,
  undigestedFood: 0,
  animalId: undefined,
  sessionId: undefined,
  fecesFormId: undefined,
  fecesColorId: undefined,
  fecesSmellId: undefined,
  fecesConsistencyId: undefined,
};

export const createDungTestSchema = (_: any) =>
  z.object({
    animalId: z.string().optional().nullable(),
    sessionId: z.string().optional().nullable(),
    fecesColorId: z.string().optional().nullable(),
    fecesSmellId: z.string().optional().nullable(),
    fecesConsistencyId: z.string().optional().nullable(),
    fecesFormId: z.string().optional().nullable(),
    amount: z.coerce.number().optional().nullable(),
    undigestedFood: z.coerce.number().optional().nullable(),
  });

export type DungTestSchema = z.infer<ReturnType<typeof createDungTestSchema>>;
