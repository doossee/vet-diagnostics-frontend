import { UpdateBody, FecesExam } from "@/shared/types";
import { DungTestSchema } from "@/features/dung-tests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DungTestQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { fecesExamControllerCreate, fecesExamControllerDelete, fecesExamControllerUpdate } from "@/shared/api/api-new";

export function useCreateDungTest() {
  const client = useQueryClient();

  return useMutation<any, any, DungTestSchema>({
    mutationFn: fecesExamControllerCreate,
    onSuccess: (data) => {
      createQueryData<FecesExam>(client, [DungTestQueryKeys.DUNG_TESTS], data);
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS] });
      client.invalidateQueries({
        queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [DungTestQueryKeys.DUNG_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useUpdateDungTest() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<DungTestSchema>>({
    mutationFn: async ({ id, body }) => fecesExamControllerUpdate(id as string, body),
    onSuccess: (data) => {
      updateQueryData<FecesExam>(client, [DungTestQueryKeys.DUNG_TESTS], data);
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS] });
      client.invalidateQueries({
        queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [DungTestQueryKeys.DUNG_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}

export function useDeleteDungTest() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => fecesExamControllerDelete(id as string),
    onSuccess: (data) => {
      removeQueryData<FecesExam>(client, [DungTestQueryKeys.DUNG_TESTS], data.id);
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS] });
      client.invalidateQueries({
        queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT],
      });
      if (data?.animalId) {
        client.invalidateQueries({
          queryKey: [DungTestQueryKeys.DUNG_TESTS_LAST_BY_ANIMAL, data.animalId],
        });
      }
    },
  });
}
