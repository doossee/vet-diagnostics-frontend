import { Animal, Color, UpdateBody } from "@/shared/types";
import { AnimalSchema } from "@/features/animals/animal.model";
import { AnimalQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { animalsControllerCreate, animalsControllerRemove, animalsControllerUpdate } from "@/shared/api";

export function useCreateAnimal() {
  const client = useQueryClient();

  return useMutation<any, any, AnimalSchema>({
    mutationFn: animalsControllerCreate,
    onSuccess: (data) => {
      createQueryData<AnimalSchema>(client, [AnimalQueryKeys.ANIMALS], data);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}

export function useUpdateAnimal() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<AnimalSchema>>({
    mutationFn: async ({ id, body }) => animalsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<Color>(client, [AnimalQueryKeys.ANIMALS], data);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}

export function useDeleteAnimal() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: animalsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<Color>(client, [AnimalQueryKeys.ANIMALS], data.id);
      // client.invalidateQueries({ queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS] })
    },
  });
}
