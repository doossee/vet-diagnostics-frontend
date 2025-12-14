import { UpdateBody, BloodExam } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GeneralBloodTestSchema } from "@/features/general-blood-tests";
import { GeneralBloodTestQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { bloodExamControllerCreate, bloodExamControllerUpdate, bloodExamControllerDelete } from "@/shared/api/api-new";
import { AnimalQueryKeys } from "@/entities/animals/utils/constants/query-keys";

export function useCreateGeneralBloodTest() {
  const client = useQueryClient();

  return useMutation<any, any, GeneralBloodTestSchema>({
    mutationFn: bloodExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<BloodExam>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data);
      client.invalidateQueries({
        queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralBloodTestQueryKeys.LAST_GENERAL_BLOOD_TEST, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
    },
  });
}

export function useUpdateGeneralBloodTest() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<GeneralBloodTestSchema>>({
    mutationFn: async ({ id, body }) => bloodExamControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<BloodExam>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data);
      client.invalidateQueries({
        queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralBloodTestQueryKeys.LAST_GENERAL_BLOOD_TEST, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
    },
  });
}

export function useDeleteGeneralBloodTest() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => bloodExamControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<BloodExam>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data.id);
      client.invalidateQueries({
        queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [GeneralBloodTestQueryKeys.LAST_GENERAL_BLOOD_TEST, data.animalId],
        });
        client.invalidateQueries({
          queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, data.animalId],
        });
      }
    },
  });
}
