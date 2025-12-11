import { z } from "zod";

export const dungTestValues = {
  animalId: undefined,
  fecesColorId: undefined,
  fecesSmellId: undefined,
  fecesConsistencyId: undefined,
  fecesFormId: undefined,
  amount: 0,
  undigestedFood: 0,
};

export const createDungTestSchema = (_: any) =>
  z.object({
    animalId: z.string(),
    fecesColorId: z.string().optional(),
    fecesSmellId: z.string().optional(),
    fecesConsistencyId: z.string().optional(),
    fecesFormId: z.string().optional(),
    amount: z.coerce.number().optional(),
    undigestedFood: z.coerce.number().optional(),
  });

export type DungTestSchema = z.infer<ReturnType<typeof createDungTestSchema>>;
