import { bloodSerumTestsControllerFindAll } from "@/shared/api"
import { BloodSerumTest, PaginatedEntity } from "@/shared/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"
import { BloodSerumTestQueryKeys } from "../utils/constants/query-keys"

export function useGetBloodSerumTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<BloodSerumTest>, Error>({
    queryKey: [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => bloodSerumTestsControllerFindAll(params) as Promise<PaginatedEntity<BloodSerumTest>>,
    enabled,
  })
}

export function useGetBloodSerumTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [BloodSerumTestQueryKeys.BLOOD_SERUM_TESTS_SELECT, search],
    queryFn: (params) => bloodSerumTestsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<BloodSerumTest>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage??0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total ? {
        page: nextPage,
        perPage: 20,
        ...(search && { search })
      } : null;
    },
  })
}