import { leatherCoversControllerFindAll } from "@/shared/api";
import { LeatherCover, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { LeatherCoverQueryKeys } from "../utils/constants/query-keys";

export function useGetLeatherCover(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<LeatherCover>, Error>({
    queryKey: [LeatherCoverQueryKeys.LEATHER_COVER, ...paramsToQueryKeys(params)],
    queryFn: async () => leatherCoversControllerFindAll(params) as Promise<PaginatedEntity<LeatherCover>>,
    enabled,
  });
}

export function useGetLeatherCoverInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [LeatherCoverQueryKeys.LEATHER_COVER_SELECT, search],
    queryFn: (params) => leatherCoversControllerFindAll(params.pageParam) as Promise<PaginatedEntity<LeatherCover>>,
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
