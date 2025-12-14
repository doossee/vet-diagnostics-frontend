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

export const createAnimalSchema = (_: any) =>
  z.object({
    animalNameCode: z.string({
      required_error: "Название кличку животного",
      invalid_type_error: "Название животного должна быть строкой",
    })
    .min(1, { message: "Название животного не может быть пустой" })
    .trim(),

    age: z
      .number({
        required_error: "Укажите возраст животного",
        invalid_type_error: "Возраст животного должен быть числом",
      })
      .min(1, {
        message: "Возраст животного должен быть больше 0",
      }),

    animalColorId: z.string({
      required_error: "Укажите цвет животного",
      invalid_type_error: "Цвет животного должен быть строкой",
    }),

    animalTypeId: z.string({
      required_error: "Укажите тип животного",
      invalid_type_error: "Тип животного должен быть строкой",
    }),

    animalBreedId: z.string({
      required_error: "Укажите породу животного",
      invalid_type_error: "Порода животного должна быть строкой",
    }),

    arrivalDate: z.date({
      required_error: "Укажите дату поступления",
      invalid_type_error: "Дата поступления указана некорректно",
    }),

    sex: z.enum(ANIMAL_GENDERS_ARRAY, {
      required_error: "Укажите пол животного",
      invalid_type_error: "Пол животного указан некорректно",
    }),

    farmerId: z.string().nullable(),
  });

export type AnimalSchema = z.infer<ReturnType<typeof createAnimalSchema>>;
