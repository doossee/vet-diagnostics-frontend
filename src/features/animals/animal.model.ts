import { ANIMAL_GENDERS_ARRAY } from "@/entities/animals/utils/constants/animal-genders";
import { z } from "zod";

export const animalValues = {
  age: 0,
  farmerId: null,
  arrivalDate: null,
  animalTypeId: null,
  animalNameCode: "",
  animalBreedId: null,
  animalColorId: null,
  sex: ANIMAL_GENDERS_ARRAY[0],
};

export const createAnimalSchema = (t: any) =>
  z.object({
    animalNameCode: z.string({
      required_error: t("required.colorRequired"),
      invalid_type_error: t("required.colorRequired"),
    }),
    age: z.number({
      required_error: t("required.colorRequired"),
      invalid_type_error: t("required.colorRequired"),
    }),
    animalColorId: z.string({
      required_error: t("required.colorRequired"),
      invalid_type_error: t("required.colorRequired"),
    }),
    animalTypeId: z.string({
      required_error: t("required.animalTypeRequired"),
      invalid_type_error: t("required.animalTypeRequired"),
    }),
    animalBreedId: z.string({
      required_error: t("required.breedRequired"),
      invalid_type_error: t("required.breedRequired"),
    }),
    arrivalDate: z.date({
      required_error: t("required.arrivalDateRequired"),
      invalid_type_error: t("required.arrivalDateRequired"),
    }),
    sex: z.enum(ANIMAL_GENDERS_ARRAY, {
      required_error: t("required.genderRequired"),
      invalid_type_error: t("required.genderRequired"),
    }),
    farmerId: z.string().nullable(),
  });

export type AnimalSchema = z.infer<ReturnType<typeof createAnimalSchema>>;
