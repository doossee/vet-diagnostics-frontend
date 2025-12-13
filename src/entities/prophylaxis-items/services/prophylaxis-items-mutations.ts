import { UpdateBody, ProphylaxisItem } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProphylaxisItemsQueryKeys } from "../utils/constants/query-keys";
import { ProphylaxisItemSchema } from "@/features/prophylaxis-items/prophylaxis-item.model";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { prophylaxisItemControllerCreate, prophylaxisItemControllerDelete, prophylaxisItemControllerUpdate } from "@/shared/api/api-new";

export function useCreateProphylaxisItem() {
  const client = useQueryClient();

  return useMutation<any, any, ProphylaxisItemSchema>({
    mutationFn: prophylaxisItemControllerCreate,
    onSuccess: (data) => {
      createQueryData<ProphylaxisItem>(client, [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS_SELECT],
      });
    },
  });
}

export function useUpdateProphylaxisItem() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<ProphylaxisItemSchema>>({
    mutationFn: async ({ id, body }) => prophylaxisItemControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<ProphylaxisItem>(client, [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS], data);
      client.invalidateQueries({
        queryKey: [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS_SELECT],
      });
    },
  });
}

export function useDeleteProphylaxisItem() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => prophylaxisItemControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<ProphylaxisItem>(client, [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS], data.id);
      client.invalidateQueries({
        queryKey: [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS_SELECT],
      });
    },
  });
}
