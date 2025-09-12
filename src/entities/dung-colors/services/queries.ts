import { dungColorsControllerFindAll } from "@/shared/api";
import { DungColor, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { DungColorQueryKeys } from "../utils/constants/query-keys";

export function useGetDungColors(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<DungColor>, Error>({
    queryKey: [DungColorQueryKeys.DUNG_COLORS, ...paramsToQueryKeys(params)],
    queryFn: async () => dungColorsControllerFindAll(params) as Promise<PaginatedEntity<DungColor>>,
    enabled,
  });
}

export function useGetDungColorsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DungColorQueryKeys.DUNG_COLORS, search],
    queryFn: (params) => dungColorsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<DungColor>>,
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
