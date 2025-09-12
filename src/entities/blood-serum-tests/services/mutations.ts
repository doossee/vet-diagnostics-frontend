import { UpdateBody, BloodSerumTest } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BloodSerumTestSchema } from "@/features/blood-serum-tests";
import { BloodSerumTestQueryKeys } from "../utils/constants/query-keys";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { bloodSerumTestsControllerCreate, bloodSerumTestsControllerRemove, bloodSerumTestsControllerUpdate } from "@/shared/api";

export function useCreateBloodSerumTest() {
  const client = useQueryClient();

  return useMutation<any, any, BloodSerumTestSchema>({
    mutationFn: bloodSerumTestsControllerCreate,
    onSuccess: (data) => {
      createQueryData<BloodSerumTest>(client, [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS], data);
      client.invalidateQueries({
        queryKey: [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS_SELECT],
      });
    },
  });
}

export function useUpdateBloodSerumTest() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<BloodSerumTestSchema>>({
    mutationFn: async ({ id, body }) => bloodSerumTestsControllerUpdate(+id, body),
    onSuccess: (data) => {
      updateQueryData<BloodSerumTest>(client, [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS], data);
      client.invalidateQueries({
        queryKey: [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS_SELECT],
      });
    },
  });
}

export function useDeleteBloodSerumTest() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: bloodSerumTestsControllerRemove,
    onSuccess: (data) => {
      removeQueryData<BloodSerumTest>(client, [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS], data.id);
      client.invalidateQueries({
        queryKey: [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS_SELECT],
      });
    },
  });
}
