import { Color, UpdateBody } from "@/shared/types";
import { AnimalColorSchema } from "@/features/animal-colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimalColorQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { animalColorControllerCreate, animalColorControllerDelete, animalColorControllerUpdate } from "@/shared/api/api-new";

export function useCreateAnimalColor() {
  const client = useQueryClient();

  return useMutation<any, any, AnimalColorSchema>({
    mutationFn: animalColorControllerCreate,
    onSuccess: (data) => {
      createQueryData<AnimalColorSchema>(client, [AnimalColorQueryKeys.ANIMAL_COLORS], data);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}

export function useUpdateAnimalColor() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AnimalColorSchema>>({
    mutationFn: async ({ id, body }) => animalColorControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<Color>(client, [AnimalColorQueryKeys.ANIMAL_COLORS], data);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}

export function useDeleteAnimalColor() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => animalColorControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<Color>(client, [AnimalColorQueryKeys.ANIMAL_COLORS], data.id);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}
