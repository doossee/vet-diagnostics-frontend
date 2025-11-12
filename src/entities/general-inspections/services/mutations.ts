import { UpdateBody, GeneralInspection } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GeneralInspectionSchema } from "@/features/general-inspections";
import { GeneralInspectionQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { generalInspectionControllerCreate, generalInspectionControllerRemove, generalInspectionControllerUpdate } from "@/shared/api";

export function useCreateGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, GeneralInspectionSchema>({
    mutationFn: generalInspectionControllerCreate as any,
    onSuccess: (data) => {
      createQueryData<GeneralInspection>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}

export function useUpdateGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<GeneralInspectionSchema>>({
    mutationFn: async ({ id, body }) => generalInspectionControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<GeneralInspection>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}

export function useDeleteGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: generalInspectionControllerRemove,
    onSuccess: (data) => {
      removeQueryData<GeneralInspection>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data.id);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}
