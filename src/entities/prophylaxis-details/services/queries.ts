import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { ProphylaxisDetail, PaginatedEntity } from "@/shared/types";
import { ProphylaxisDetailsQueryKeys } from "../utils/constants/query-keys";
import { prophylaxisDetailControllerFindAll } from "@/shared/api/api-new";

export function useGetProphylaxisDetails(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<ProphylaxisDetail>, Error>({
    queryKey: [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisDetailControllerFindAll(params) as Promise<PaginatedEntity<ProphylaxisDetail>>,
    enabled,
  });
}

export function useGetProphylaxisDetailsInfinite(itemId?: string, search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisDetailsQueryKeys.PROPHYLAXIS_DETAILS_SELECT, itemId, search],
    queryFn: (params) => prophylaxisDetailControllerFindAll(params.pageParam) as Promise<PaginatedEntity<ProphylaxisDetail>>,
    initialPageParam: { page: 1, perPage: 20, itemId, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            itemId,
            ...(search && { search }),
          }
        : null;
    },
    enabled: !!itemId,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });
}