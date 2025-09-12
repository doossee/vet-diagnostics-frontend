import { z } from "zod";

export const animalValues = {
  weight: 0,
  typeId: null,
  breedId: null,
  colorId: null,
  farmerId: null,
  nameOrCode: "",
  gender: "MALE",
  birthDate: null,
  arrivalDate: null,
};

export const createAnimalSchema = (t: any) =>
  z.object({
    birthDate: z.date({
      required_error: t("required.birthDateRequired"),
      invalid_type_error: t("required.birthDateRequired"),
    }),
    colorId: z.number({
      required_error: t("required.colorRequired"),
      invalid_type_error: t("required.colorRequired"),
    }),
    arrivalDate: z.date({
      required_error: t("required.arrivalDateRequired"),
      invalid_type_error: t("required.arrivalDateRequired"),
    }),
    farmerId: z.number().nullable(),
    breedId: z.number().min(1, t("required.breedRequired")),
    gender: z.enum(["MALE", "FEMALE"], {
      required_error: t("required.genderRequired"),
      invalid_type_error: t("required.genderRequired"),
    }),
    nameOrCode: z.string().min(1, t("required.animalNameRequired")),
    typeId: z.number().min(1, t("required.animalTypeRequired")),
    weight: z.number().min(1, t("required.weightRequired")),
  });

export type AnimalSchema = z.infer<ReturnType<typeof createAnimalSchema>>;
