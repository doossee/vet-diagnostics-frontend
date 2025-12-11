import { UpdateBody, Prophylaxis } from "@/shared/types";
import { ProphylaxisSchema } from "@/features/prophylaxis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProphylaxisQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { prophylaxisControllerCreate, prophylaxisControllerDelete, prophylaxisControllerUpdate } from "@/shared/api/api-new";

export function useCreateProphylaxis() {
  const client = useQueryClient();

  return useMutation<any, any, ProphylaxisSchema>({
    mutationFn: prophylaxisControllerCreate,
    onSuccess: (data) => {
      createQueryData<Prophylaxis>(client, [ProphylaxisQueryKeys.PROPHYLAXIS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_SELECT],
      });
    },
  });
}

export function useUpdateProphylaxis() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<ProphylaxisSchema>>({
    mutationFn: async ({ id, body }) => prophylaxisControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<Prophylaxis>(client, [ProphylaxisQueryKeys.PROPHYLAXIS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_SELECT],
      });
    },
  });
}

export function useDeleteProphylaxis() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => prophylaxisControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<Prophylaxis>(client, [ProphylaxisQueryKeys.PROPHYLAXIS], data.id);
      client.invalidateQueries({
        queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_SELECT],
      });
    },
  });
}
