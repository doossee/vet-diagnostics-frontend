import { eyelidsControllerFindAll } from "@/shared/api";
import { Eyelid, PaginatedEntity } from "@/shared/types";
import { EyeLidQueryKeys } from "../utils/constants/query-keys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetEyeLids(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Eyelid>, Error>({
    queryKey: [EyeLidQueryKeys.EYE_LIDS, ...paramsToQueryKeys(params)],
    queryFn: async () => eyelidsControllerFindAll(params) as Promise<PaginatedEntity<Eyelid>>,
    enabled,
  });
}

export function useGetEyeLidsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [EyeLidQueryKeys.EYE_LIDS_SELECT, search],
    queryFn: (params) => eyelidsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Eyelid>>,
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
