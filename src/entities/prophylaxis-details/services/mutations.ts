import { UpdateBody, Prophylaxis } from "@/shared/types";
import { ProphylaxisDetailSchema } from "@/features/prophylaxis-details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProphylaxisDetailsQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { prophylaxisDetailControllerCreate, prophylaxisDetailControllerDelete, prophylaxisDetailControllerUpdate } from "@/shared/api/api-new";

export function useCreateProphylaxisDetail() {
  const client = useQueryClient();

  return useMutation<any, any, ProphylaxisDetailSchema>({
    mutationFn: prophylaxisDetailControllerCreate,
    onSuccess: (data) => {
      createQueryData<Prophylaxis>(client, [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS_SELECT],
      });
    },
  });
}

export function useUpdateProphylaxisDetail() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<ProphylaxisDetailSchema>>({
    mutationFn: async ({ id, body }) => prophylaxisDetailControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<Prophylaxis>(client, [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS_SELECT],
      });
    },
  });
}

export function useDeleteProphylaxisDetail() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => prophylaxisDetailControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<Prophylaxis>(client, [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS], data.id);
      client.invalidateQueries({
        queryKey: [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS_SELECT],
      });
    },
  });
}
