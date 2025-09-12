import { DistrictSchema } from "@/features/districts";
import { District, UpdateBody } from "@/shared/types";
import { DistrictsQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { districtsControllerCreate, districtsControllerRemove, districtsControllerUpdate } from "@/shared/api";

export function useCreateDistrict() {
  const client = useQueryClient();

  return useMutation<any, any, DistrictSchema>({
    mutationFn: districtsControllerCreate,
    onSuccess: (data) => {
      createQueryData<District>(client, [DistrictsQueryKeys.DISTRICTS], data);
      client.invalidateQueries({
        queryKey: [DistrictsQueryKeys.DISTRICTS_SELECT],
      });
    },
  });
}

export function useUpdateDistrict() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<DistrictSchema>>({
    mutationFn: async ({ id, body }) => districtsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<District>(client, [DistrictsQueryKeys.DISTRICTS], data);
      client.invalidateQueries({
        queryKey: [DistrictsQueryKeys.DISTRICTS_SELECT],
      });
    },
  });
}

export function useDeleteDistrict() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: districtsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<District>(client, [DistrictsQueryKeys.DISTRICTS], data.id);
      client.invalidateQueries({
        queryKey: [DistrictsQueryKeys.DISTRICTS_SELECT],
      });
    },
  });
}
