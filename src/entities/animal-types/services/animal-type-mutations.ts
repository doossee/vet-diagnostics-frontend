import { AnimalType, UpdateBody } from "@/shared/types";
import { AnimalTypeSchema } from "@/features/animal-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimalTypesQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { animalTypeControllerCreate, animalTypeControllerDelete, animalTypeControllerUpdate } from "@/shared/api/api-new";

export function useCreateAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, AnimalTypeSchema>({
    mutationFn: animalTypeControllerCreate,
    onSuccess: (data) => {
      createQueryData<AnimalTypeSchema>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data, 'first');
      client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES_SELECT] })
    },
  });
}

export function useUpdateAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AnimalTypeSchema>>({
    mutationFn: async ({ id, body }) => animalTypeControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<AnimalType>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data);
      client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES_SELECT] })
    },
  });
}

export function useDeleteAnimalType() {
  const client = useQueryClient();

  return useMutation<any, any, string | number>({
    mutationFn: (id) => animalTypeControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<AnimalType>(client, [AnimalTypesQueryKeys.ANIMAL_TYPES], data.id);
      client.invalidateQueries({ queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES_SELECT] })
    },
  });
}
