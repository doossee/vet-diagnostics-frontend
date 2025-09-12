import { AnimalType, UpdateBody } from "@/shared/types";
import { AnimalTypeSchema } from "@/features/animal-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimalTypesQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { animalTypesControllerCreate, animalTypesControllerRemove, animalTypesControllerUpdate } from "@/shared/api";

export function useCreateAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, AnimalTypeSchema>({
    mutationFn: animalTypesControllerCreate,
    onSuccess: (data) => {
      createQueryData<AnimalTypeSchema>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data);
      // client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES] })
    },
  });
}

export function useUpdateAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AnimalTypeSchema>>({
    mutationFn: async ({ id, body }) => animalTypesControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<AnimalType>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data);
      // client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES] })
    },
  });
}

export function useDeleteAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: animalTypesControllerRemove,
    onSuccess: (data) => {
      removeQueryData<AnimalType>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data.id);
      // client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES] })
    },
  });
}
