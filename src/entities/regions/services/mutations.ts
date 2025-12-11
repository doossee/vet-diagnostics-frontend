import { RegionSchema } from "@/features/regions";
import { UpdateBody, Region } from "@/shared/types";
import { RegionsQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { regionControllerCreate, regionControllerDelete, regionControllerUpdate } from "@/shared/api/api-new";

export function useCreateRegions() {
  const client = useQueryClient();

  return useMutation<any, any, RegionSchema>({
    mutationFn: regionControllerCreate,
    onSuccess: (data) => {
      createQueryData<RegionSchema>(client, [RegionsQueryKeys.REGIONS], data);
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] });
    },
  });
}

export function useUpdateRegions() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<RegionSchema>>({
    mutationFn: async ({ id, body }) => regionControllerUpdate(id as number, body),
    onSuccess: (data) => {
      updateQueryData<Region>(client, [RegionsQueryKeys.REGIONS], data);
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] });
    },
  });
}

export function useDeleteRegions() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => regionControllerDelete(id as number),
    onSuccess: (data) => {
      removeQueryData<Region>(client, [RegionsQueryKeys.REGIONS], data.id);
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] });
    },
  });
}
