import { districtsControllerFindAll } from "@/shared/api";
import { District, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { DistrictsQueryKeys } from "../utils/constants/query-keys";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetDistricts(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<District>, Error>({
    queryKey: [DistrictsQueryKeys.DISTRICTS, ...paramsToQueryKeys(params)],
    queryFn: async () => districtsControllerFindAll(params) as Promise<PaginatedEntity<District>>,
    enabled,
  });
}

export function useGetDistrictsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DistrictsQueryKeys.DISTRICTS_SELECT, search],
    queryFn: (params) => districtsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<District>>,
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
  });
}
