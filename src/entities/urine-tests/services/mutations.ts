import { UpdateBody, UrineExam } from "@/shared/types";
import { UrineTestSchema } from "@/features/urine-tests";
import { UrineTestQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { urineExamControllerCreate, urineExamControllerDelete, urineExamControllerUpdate } from "@/shared/api/api-new";

export function useCreateUrineTest() {
  const client = useQueryClient();

  return useMutation<any, any, UrineTestSchema>({
    mutationFn: urineExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<UrineExam>(client, [UrineTestQueryKeys.URINE_TESTS], data);
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS] });
      client.invalidateQueries({
        queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [UrineTestQueryKeys.URINE_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useUpdateUrineTest() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<UrineTestSchema>>({
    mutationFn: async ({ id, body }) => urineExamControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<UrineExam>(client, [UrineTestQueryKeys.URINE_TESTS], data);
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS] });
      client.invalidateQueries({
        queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [UrineTestQueryKeys.URINE_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useDeleteUrineTest() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => urineExamControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<UrineExam>(client, [UrineTestQueryKeys.URINE_TESTS], data.id);
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS] });
      client.invalidateQueries({
        queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [UrineTestQueryKeys.URINE_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}
