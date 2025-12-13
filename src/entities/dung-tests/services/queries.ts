import { FecesExam, PaginatedEntity } from "@/shared/types";
import { DungTestQueryKeys } from "../utils/constants/query-keys";
import { fecesColorControllerFindAll } from "@/shared/api/api-new";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetDungTests(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<FecesExam>, Error>({
    queryKey: [DungTestQueryKeys.DUNG_TESTS, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesColorControllerFindAll(params) as Promise<PaginatedEntity<FecesExam>>,
    enabled,
  });
}

export function useGetLastDungTestByAnimal(animalId: number | string, enabled?: boolean) {
  return useQuery<FecesExam|null>({
    queryKey: [DungTestQueryKeys.DUNG_TESTS_LAST_BY_ANIMAL, animalId],
    queryFn: async () => {
      const { data } = await fecesColorControllerFindAll({
        page: 1,
        perPage: 1
      })
      
      return data?.[0] ?? null
    },
    enabled,
  });
}

export function useGetDungTestsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT, search],
    queryFn: (params) => fecesColorControllerFindAll(params.pageParam) as Promise<PaginatedEntity<FecesExam>>,
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
