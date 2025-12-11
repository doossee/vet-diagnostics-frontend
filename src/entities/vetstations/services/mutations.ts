import { UpdateBody, VetStation } from "@/shared/types";
import { VetStationSchema } from "@/features/vetstations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VetStationQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { vetStationControllerCreate, vetStationControllerDelete, vetStationControllerUpdate } from "@/shared/api/api-new";

export function useCreateVetStation() {
  const client = useQueryClient();

  return useMutation<any, any, VetStationSchema>({
    mutationFn: vetStationControllerCreate,
    onSuccess: (data) => {
      createQueryData<VetStation>(client, [VetStationQueryKeys.VETSTATIONS], data);
      client.invalidateQueries({
        queryKey: [VetStationQueryKeys.VETSTATIONS_SELECT],
      });
    },
  });
}

export function useUpdateVetStation() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<VetStationSchema>>({
    mutationFn: async ({ id, body }) => vetStationControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<VetStation>(client, [VetStationQueryKeys.VETSTATIONS], data);
      client.invalidateQueries({
        queryKey: [VetStationQueryKeys.VETSTATIONS_SELECT],
      });
    },
  });
}

export function useDeleteVetStation() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => vetStationControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<VetStation>(client, [VetStationQueryKeys.VETSTATIONS], data.id);
      client.invalidateQueries({
        queryKey: [VetStationQueryKeys.VETSTATIONS_SELECT],
      });
    },
  });
}
