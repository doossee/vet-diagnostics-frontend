import { generalBloodTestControllerFindAll } from "@/shared/api";
import { GeneralBloodTest, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { GeneralBloodTestQueryKeys } from "../utils/constants/query-keys";

export function useGetGeneralBloodTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<GeneralBloodTest>, Error>({
    queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => generalBloodTestControllerFindAll(params) as Promise<PaginatedEntity<GeneralBloodTest>>,
    enabled,
  });
}

export function useGetLastGeneralBloodTest(animalId: number | string, enabled?: boolean) {
  return useQuery<GeneralBloodTest|null>({
    queryKey: [GeneralBloodTestQueryKeys.LAST_GENERAL_BLOOD_TEST, animalId],
    queryFn: async () => {
      const { data } = await generalBloodTestControllerFindAll({
        page: 1,
        perPage: 1,
        byCreatedDate: "desc",
        animalId
      })

      return data?.[0] ?? null
    },
    enabled,
  });
}

export function useGetGeneralBloodTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT, search],
    queryFn: (params) => generalBloodTestControllerFindAll(params.pageParam) as Promise<PaginatedEntity<GeneralBloodTest>>,
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
