import { regionControllerFindAll } from "@/shared/api/api-new";
import { PaginatedEntity, Region } from "@/shared/types";
import { RegionsQueryKeys } from "../utils/constants/query-keys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetRegions(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Region>, Error>({
    queryKey: [RegionsQueryKeys.REGIONS, ...paramsToQueryKeys(params)],
    queryFn: async () => regionControllerFindAll(params) as Promise<PaginatedEntity<Region>>,
    enabled,
  });
}

export function useGetRegionsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [RegionsQueryKeys.REGIONS_SELECT, search],
    queryFn: (params) => regionControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Region>>,
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 20 * 60 * 1000, // 20 minutes
  });
}
