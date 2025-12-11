import { UpdateBody, ClinicalExam } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GeneralInspectionSchema } from "@/features/general-inspections";
import { GeneralInspectionQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { clinicalExamControllerCreate, clinicalExamControllerDelete, clinicalExamControllerUpdate } from "@/shared/api/api-new";

export function useCreateGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, GeneralInspectionSchema>({
    mutationFn: clinicalExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<ClinicalExam>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}

export function useUpdateGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<GeneralInspectionSchema>>({
    mutationFn: async ({ id, body }) => clinicalExamControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<ClinicalExam>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}

export function useDeleteGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => clinicalExamControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<ClinicalExam>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data.id);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
    },
  });
}
