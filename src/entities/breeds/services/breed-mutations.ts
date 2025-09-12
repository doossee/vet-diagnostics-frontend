import { BreedSchema } from "@/features/breeds";
import { Breed, UpdateBody } from "@/shared/types";
import { BreedQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { breedsControllerCreate, breedsControllerRemove, breedsControllerUpdate } from "@/shared/api";

export function useCreateBreed() {
  const client = useQueryClient();

  return useMutation<any, any, BreedSchema>({
    mutationFn: breedsControllerCreate,
    onSuccess: (data) => {
      createQueryData<Breed>(client, [BreedQueryKeys.BREEDS], data);
      // client.invalidateQueries({ queryKey: [BreedQueryKeys.BREEDS_SELECT] })
    },
  });
}

export function useUpdateBreed() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<BreedSchema>>({
    mutationFn: async ({ id, body }) => breedsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<Breed>(client, [BreedQueryKeys.BREEDS], data);
      // client.invalidateQueries({ queryKey: [BreedQueryKeys.BREEDS_SELECT] })
    },
  });
}

export function useDeleteBreed() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: breedsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<Breed>(client, [BreedQueryKeys.BREEDS], data.id);
      // client.invalidateQueries({ queryKey: [BreedQueryKeys.BREEDS_SELECT] })
    },
  });
}
