import { LeatherCoverSchema } from "@/features/leather-cover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LeatherCoverQueryKeys } from "../utils/constants/query-keys";
import { LeatherCover, UpdateBody, VaccineType } from "@/shared/types";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { leatherCoversControllerCreate, leatherCoversControllerRemove, leatherCoversControllerUpdate } from "@/shared/api";

export function useCreateLeatgerCover() {
  const client = useQueryClient();

  return useMutation<any, any, LeatherCoverSchema>({
    mutationFn: leatherCoversControllerCreate,
    onSuccess: (data) => {
      createQueryData<LeatherCover>(client, [LeatherCoverQueryKeys.LEATHER_COVER], data);
      client.invalidateQueries({
        queryKey: [LeatherCoverQueryKeys.LEATHER_COVER_SELECT],
      });
    },
  });
}

export function useUpdateLeatgerCover() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<LeatherCoverSchema>>({
    mutationFn: async ({ id, body }) => leatherCoversControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<LeatherCover>(client, [LeatherCoverQueryKeys.LEATHER_COVER], data);
      client.invalidateQueries({
        queryKey: [LeatherCoverQueryKeys.LEATHER_COVER_SELECT],
      });
    },
  });
}

export function useDeleteLeatgerCover() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: leatherCoversControllerRemove,
    onSuccess: (data) => {
      removeQueryData<LeatherCover>(client, [LeatherCoverQueryKeys.LEATHER_COVER], data.id);
      client.invalidateQueries({
        queryKey: [LeatherCoverQueryKeys.LEATHER_COVER_SELECT],
      });
    },
  });
}
