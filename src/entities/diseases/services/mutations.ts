import { DiseaseSchema } from "@/features/diseases";
import { Disease, UpdateBody } from "@/shared/types";
import { DiseaseQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate } from "@/shared/api";

export function useCreateDisease() {
  const client = useQueryClient();

  return useMutation<any, any, DiseaseSchema>({
    mutationFn: diseasesControllerCreate,
    onSuccess: (data) => {
      createQueryData<Disease>(client, [DiseaseQueryKeys.DISEASES], data);
      client.invalidateQueries({
        queryKey: [DiseaseQueryKeys.DISEASES_SELECT],
      });
    },
  });
}

export function useUpdateDisease() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<DiseaseSchema>>({
    mutationFn: async ({ id, body }) => diseasesControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<Disease>(client, [DiseaseQueryKeys.DISEASES], data);
      client.invalidateQueries({
        queryKey: [DiseaseQueryKeys.DISEASES_SELECT],
      });
    },
  });
}

export function useDeleteDisease() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: diseasesControllerRemove,
    onSuccess: (data) => {
      removeQueryData<Disease>(client, [DiseaseQueryKeys.DISEASES], data.id);
      client.invalidateQueries({
        queryKey: [DiseaseQueryKeys.DISEASES_SELECT],
      });
    },
  });
}
