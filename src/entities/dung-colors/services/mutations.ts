import { UpdateBody, UrineColor } from "@/shared/types";
import { DungColorSchema } from "@/features/dung-colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DungColorQueryKeys } from "../utils/constants/query-keys";
import { ADDITIONAL_CRUD_QUERY_KEYS } from "@/entities/additional-crud/utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { fecesColorControllerCreate, fecesColorControllerDelete, fecesColorControllerUpdate } from "@/shared/api/api-new";

export function useCreateDungColor() {
  const client = useQueryClient();

  return useMutation<any, any, DungColorSchema>({
    mutationFn: fecesColorControllerCreate,
    onSuccess: (data) => {
      createQueryData<UrineColor>(client, [DungColorQueryKeys.DUNG_COLORS], data);
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_COLORS_LOOKUP] });
    },
  });
}

export function useUpdateDungColor() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<DungColorSchema>>({
    mutationFn: async ({ id, body }) => fecesColorControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<UrineColor>(client, [DungColorQueryKeys.DUNG_COLORS], data);
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_COLORS_LOOKUP] });
    },
  });
}

export function useDeleteDungColor() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => fecesColorControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<UrineColor>(client, [DungColorQueryKeys.DUNG_COLORS], data.id);
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] });
      client.invalidateQueries({ queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.FECES_COLORS_LOOKUP] });
    },
  });
}
