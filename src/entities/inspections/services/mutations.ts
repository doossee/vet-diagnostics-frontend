import { UpdateBody, Inspection } from "@/shared/types";
import { InspectionSchema } from "@/features/inspections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InspectionQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from "@/shared/api";

export function useCreateInspection() {
  const client = useQueryClient();

  return useMutation<any, any, InspectionSchema>({
    mutationFn: inspectionsControllerCreate,
    onSuccess: (data) => {
      createQueryData<Inspection>(client, [InspectionQueryKeys.INSPECTION], data);
      client.invalidateQueries({
        queryKey: [InspectionQueryKeys.INSPECTION_SELECT],
      });
    },
  });
}

export function useUpdateInspection() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<InspectionSchema>>({
    mutationFn: async ({ id, body }) => inspectionsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<Inspection>(client, [InspectionQueryKeys.INSPECTION], data);
      client.invalidateQueries({
        queryKey: [InspectionQueryKeys.INSPECTION_SELECT],
      });
    },
  });
}

export function useDeleteInspection() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: inspectionsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<Inspection>(client, [InspectionQueryKeys.INSPECTION], data.id);
      client.invalidateQueries({
        queryKey: [InspectionQueryKeys.INSPECTION_SELECT],
      });
    },
  });
}
