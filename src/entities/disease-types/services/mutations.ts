import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateBody, DiseaseCategory } from "@/shared/types";
import { DiseaseTypeSchema } from "@/features/disease-types";
import { DiseaseTypesQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { diseaseCategoryControllerCreate, diseaseCategoryControllerDelete, diseaseCategoryControllerUpdate } from '@/shared/api/api-new';

export function useCreateDiseaseType() {
  const client = useQueryClient();

  return useMutation<any, any, DiseaseTypeSchema>({
    mutationFn: diseaseCategoryControllerCreate,
    onSuccess: (data) => {
      createQueryData<DiseaseCategory>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data);
      client.invalidateQueries({
        queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT],
      });
    },
  });
}

export function useUpdateDiseaseType() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<DiseaseTypeSchema>>({
    mutationFn: async ({ id, body }) => diseaseCategoryControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<DiseaseCategory>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data);
      client.invalidateQueries({
        queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT],
      });
    },
  });
}

export function useDeleteDiseaseType() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => diseaseCategoryControllerDelete(String(id)),
    onSuccess: (data) => {
      removeQueryData<DiseaseCategory>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data.id);
      client.invalidateQueries({
        queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT],
      });
    },
  });
}
