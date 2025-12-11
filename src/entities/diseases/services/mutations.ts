import { DiseaseSchema } from "@/features/diseases";
import { Disease, UpdateBody } from "@/shared/types";
import { DiseaseQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { diseaseControllerCreate, diseaseControllerDelete, diseaseControllerUpdate } from "@/shared/api/api-new";

export function useCreateDisease() {
  const client = useQueryClient();

  return useMutation<any, any, DiseaseSchema>({
    mutationFn: diseaseControllerCreate,
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
    mutationFn: async ({ id, body }) => diseaseControllerUpdate(id as string, body),
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
    mutationFn: id => diseaseControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<Disease>(client, [DiseaseQueryKeys.DISEASES], data.id);
      client.invalidateQueries({
        queryKey: [DiseaseQueryKeys.DISEASES_SELECT],
      });
    },
  });
}
