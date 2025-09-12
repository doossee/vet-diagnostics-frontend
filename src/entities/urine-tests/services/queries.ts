import { urineTestsControllerFindAll } from "@/shared/api";
import { UrineTest, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { UrineTestQueryKeys } from "../utils/constants/query-keys";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetUrineTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<UrineTest>, Error>({
    queryKey: [UrineTestQueryKeys.URINE_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => urineTestsControllerFindAll(params) as Promise<PaginatedEntity<UrineTest>>,
    enabled,
  });
}

export function useGetUrineTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT, search],
    queryFn: (params) => urineTestsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<UrineTest>>,
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
