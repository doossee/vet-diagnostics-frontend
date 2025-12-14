import { UpdateBody, ClinicalExam } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GeneralInspectionSchema } from "@/features/general-inspections";
import { GeneralInspectionQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { clinicalExamControllerCreate, clinicalExamControllerDelete, clinicalExamControllerUpdate } from "@/shared/api/api-new";
import { AnimalQueryKeys } from "@/entities/animals/utils/constants/query-keys";

export function useCreateGeneralInspection() {
  const client = useQueryClient();

  return useMutation<any, any, GeneralInspectionSchema>({
    mutationFn: clinicalExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<ClinicalExam>(client, [GeneralInspectionQueryKeys.GENERAL_INSPECTION], data);
      client.invalidateQueries({
        queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralInspectionQueryKeys.LAST_GENERAL_INSPECTION, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
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
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralInspectionQueryKeys.LAST_GENERAL_INSPECTION, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
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
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralInspectionQueryKeys.LAST_GENERAL_INSPECTION, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
    },
  });
}
