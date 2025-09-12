import { UpdateBody, VetStation } from "@/shared/types";
import { VetStationSchema } from "@/features/vetstations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VetStationQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { vetStationsControllerCreate, vetStationsControllerRemove, vetStationsControllerUpdate } from "@/shared/api";

export function useCreateVetStation() {
  const client = useQueryClient();

  return useMutation<any, any, VetStationSchema>({
    mutationFn: vetStationsControllerCreate,
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
    mutationFn: async ({ id, body }) => vetStationsControllerUpdate(+id, body),
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
    mutationFn: vetStationsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<VetStation>(client, [VetStationQueryKeys.VETSTATIONS], data.id);
      client.invalidateQueries({
        queryKey: [VetStationQueryKeys.VETSTATIONS_SELECT],
      });
    },
  });
}
