import { prophylaxisItemControllerFindAll } from "@/shared/api/api-new";
import { ProphylaxisItem, PaginatedEntity, ProphylaxisType } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { ProphylaxisItemsQueryKeys } from "../utils/constants/query-keys";

export function useGetProphylaxisItems(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<ProphylaxisItem>, Error>({
    queryKey: [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisItemControllerFindAll(params) as Promise<PaginatedEntity<ProphylaxisItem>>,
    enabled,
  });
}

export function useGetProphylaxisItemsInfinite(type?: ProphylaxisType, search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisItemsQueryKeys.PROPHYLAXIS_ITEMS_SELECT, type, search],
    queryFn: (params) => prophylaxisItemControllerFindAll(params.pageParam) as Promise<PaginatedEntity<ProphylaxisItem>>,
    initialPageParam: { page: 1, perPage: 20, type, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            type,
            ...(search && { search }),
          }
        : null;
    },
  });
}