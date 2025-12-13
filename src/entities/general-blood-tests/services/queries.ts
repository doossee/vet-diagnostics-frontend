import { BloodExam, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { bloodExamControllerFindAll, bloodExamControllerFindLastByAnimalId } from "@/shared/api/api-new";
import { GeneralBloodTestQueryKeys } from "../utils/constants/query-keys";

export function useGetGeneralBloodTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<BloodExam>, Error>({
    queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => bloodExamControllerFindAll(params) as Promise<PaginatedEntity<BloodExam>>,
    enabled,
  });
}

export function useGetLastGeneralBloodTest(animalId: number | string, enabled?: boolean) {
  return useQuery<BloodExam|null>({
    queryKey: [GeneralBloodTestQueryKeys.LAST_GENERAL_BLOOD_TEST, animalId],
    queryFn: async () => {
      const data = await bloodExamControllerFindLastByAnimalId(String(animalId))

      return (data ?? null) as unknown as BloodExam | null
    },
    enabled,
  });
}

export function useGetGeneralBloodTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT, search],
    queryFn: (params) => bloodExamControllerFindAll(params.pageParam) as Promise<PaginatedEntity<BloodExam>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
          }
        : null;
    },
  });
}
