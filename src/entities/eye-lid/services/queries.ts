import { EyeLidQueryKeys } from "../utils/constants/query-keys";
import { MucosaAppearance, MucosaType, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { mucosaAppearanceControllerFindAll } from "@/shared/api/api-new";

export function useGetEyeLids(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<MucosaAppearance>, Error>({
    queryKey: [EyeLidQueryKeys.EYE_LIDS, ...paramsToQueryKeys(params)],
    queryFn: async () => mucosaAppearanceControllerFindAll(params) as Promise<PaginatedEntity<MucosaAppearance>>,
    enabled,
  });
}

export function useGetEyeLidsInfinite(mucosaType?: MucosaType, search?: string) {
  return useInfiniteQuery({
    queryKey: [EyeLidQueryKeys.EYE_LIDS_SELECT, mucosaType, search],
    queryFn: (params) => mucosaAppearanceControllerFindAll(params.pageParam) as Promise<PaginatedEntity<MucosaAppearance>>,
    initialPageParam: {
      page: 1,
      perPage: 20, 
      ...(mucosaType && {mucosaType}),
      ...(search && { search })
    },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(mucosaType && {mucosaType}),
            ...(search && { search }),
          }
        : null;
    },
  });
}
