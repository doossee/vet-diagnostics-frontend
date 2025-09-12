import { dungTestsControllerFindAll } from "@/shared/api";
import { DungTest, PaginatedEntity } from "@/shared/types";
import { DungTestQueryKeys } from "../utils/constants/query-keys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetDungTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<DungTest>, Error>({
    queryKey: [DungTestQueryKeys.DUNG_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => dungTestsControllerFindAll(params) as Promise<PaginatedEntity<DungTest>>,
    enabled,
  });
}

export function useGetDungTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT, search],
    queryFn: (params) => dungTestsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<DungTest>>,
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
