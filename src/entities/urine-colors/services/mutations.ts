import { UpdateBody, UrineColor } from "@/shared/types";
import { UrineColorSchema } from "@/features/urine-colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UrineColorQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { urineColorControllerCreate, urineColorControllerDelete, urineColorControllerUpdate } from "@/shared/api/api-new";

export function useCreateUrineColor() {
  const client = useQueryClient();

  return useMutation<any, any, UrineColorSchema>({
    mutationFn: urineColorControllerCreate,
    onSuccess: (data) => {
      createQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data);
      client.invalidateQueries({
        queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT],
      });
    },
  });
}

export function useUpdateUrineColor() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<UrineColorSchema>>({
    mutationFn: async ({ id, body }) => urineColorControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data);
      client.invalidateQueries({
        queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT],
      });
    },
  });
}

export function useDeleteUrineColor() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => urineColorControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data.id);
      client.invalidateQueries({
        queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT],
      });
    },
  });
}
