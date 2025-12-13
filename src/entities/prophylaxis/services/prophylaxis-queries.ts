import { Prophylaxis, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { prophylaxisControllerFindAll } from "@/shared/api/api-new";
import { ProphylaxisQueryKeys } from "../utils/constants/query-keys";

export function useGetProphylaxis(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Prophylaxis>, Error>({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisControllerFindAll(params) as Promise<PaginatedEntity<Prophylaxis>>,
    enabled,
  });
}

export function useGetLastProphylaxisByAnimal(animalId: string, enabled?: boolean) {
  return useQuery<Prophylaxis|null>({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_LAST_BY_ANIMAL, animalId],
    queryFn: async () => {
      const { data } = await prophylaxisControllerFindAll({
        page: 1,
        perPage: 1
      })
      
      return data?.[0] ?? null
    },
    enabled,
  });
}

export function useGetProphylaxisInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_SELECT, search],
    queryFn: (params) => prophylaxisControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Prophylaxis>>,
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