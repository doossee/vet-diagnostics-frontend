import { UpdateBody, VaccineType } from "@/shared/types";
import { VaccineTypeSchema } from "@/features/vaccine-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VaccineTypesQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { vaccineTypesControllerCreate, vaccineTypesControllerRemove, vaccineTypesControllerUpdate } from "@/shared/api";

export function useCreateVaccineType() {
  const client = useQueryClient();

  return useMutation<any, any, VaccineTypeSchema>({
    mutationFn: vaccineTypesControllerCreate,
    onSuccess: (data) => {
      createQueryData<VaccineType>(client, [VaccineTypesQueryKeys.VACCINE_TYPES], data);
      client.invalidateQueries({
        queryKey: [VaccineTypesQueryKeys.VACCINE_TYPES_SELECT],
      });
    },
  });
}

export function useUpdateVaccineType() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<VaccineTypeSchema>>({
    mutationFn: async ({ id, body }) => vaccineTypesControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<VaccineType>(client, [VaccineTypesQueryKeys.VACCINE_TYPES], data);
      client.invalidateQueries({
        queryKey: [VaccineTypesQueryKeys.VACCINE_TYPES_SELECT],
      });
    },
  });
}

export function useDeleteVaccineType() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: vaccineTypesControllerRemove,
    onSuccess: (data) => {
      removeQueryData<VaccineType>(client, [VaccineTypesQueryKeys.VACCINE_TYPES], data.id);
      client.invalidateQueries({
        queryKey: [VaccineTypesQueryKeys.VACCINE_TYPES_SELECT],
      });
    },
  });
}
