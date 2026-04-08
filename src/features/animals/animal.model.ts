import { z } from "zod";

export const animalValues = {
  farmerId: null,
  arrivalDate: null,
  birthYear: new Date().getFullYear(),
  birthMonth: new Date().getMonth() + 1,
  animalTypeId: null,
  animalNameCode: "",
  animalBreedId: null,
  animalColorId: null,
  sexId: null,
};

export const createAnimalSchema = (_: any) =>
  z.object({
    animalNameCode: z
      .string({
        required_error: "Animal name is required",
        invalid_type_error: "Animal name must be a string",
      })
      .min(1, { message: "Animal name cannot be empty" })
      .trim(),

    birthYear: z
      .number({
        required_error: "Birth year is required",
        invalid_type_error: "Birth year must be a number",
      })
      .int()
      .min(1900, {
        message: "Birth year is invalid",
      })
      .max(new Date().getFullYear(), {
        message: "Birth year cannot be in the future",
      }),

    birthMonth: z
      .number({
        required_error: "Birth month is required",
        invalid_type_error: "Birth month must be a number",
      })
      .int()
      .min(1, {
        message: "Birth month is invalid",
      })
      .max(12, {
        message: "Birth month is invalid",
      }),

    animalColorId: z.string({
      required_error: "Animal color is required",
      invalid_type_error: "Animal color must be a string",
    }),

    animalTypeId: z.string({
      required_error: "Animal type is required",
      invalid_type_error: "Animal type must be a string",
    }),

    animalBreedId: z.string({
      required_error: "Animal breed is required",
      invalid_type_error: "Animal breed must be a string",
    }),

    arrivalDate: z.date({
      required_error: "Arrival date is required",
      invalid_type_error: "Arrival date is invalid",
    }),

    sexId: z.string().nullable().optional(),
    farmerId: z.string().nullable(),
  });

export type AnimalSchema = z.infer<ReturnType<typeof createAnimalSchema>>;
