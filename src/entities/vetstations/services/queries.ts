import { vetStationsControllerFindAll } from "@/shared/api";
import { PaginatedEntity, VetStation } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { VetStationQueryKeys } from "../utils/constants/query-keys";

export function useGetVetStations(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<VetStation>, Error>({
    queryKey: [VetStationQueryKeys.VETSTATIONS, ...paramsToQueryKeys(params)],
    queryFn: async () => vetStationsControllerFindAll(params) as Promise<PaginatedEntity<VetStation>>,
    enabled,
  });
}

export function useGetVetStationsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [VetStationQueryKeys.VETSTATIONS_SELECT, search],
    queryFn: (params) => vetStationsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<VetStation>>,
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
