import { z } from "zod";

export const medicalSessionValues = {
  animalId: undefined,
  veterinarianId: undefined,
  date: undefined,
  notes: ""
};

export const createMedicalSessionSchema = (_: any) =>
  z.object({
    animalId: z.string().optional(),
    veterinarianId: z.string(),
    date: z.date(),
    notes: z.string().optional()
  });

export type MedicalSessionSchema = z.infer<ReturnType<typeof createMedicalSessionSchema>>;