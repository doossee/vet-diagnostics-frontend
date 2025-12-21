import { fecesColorControllerFindAll } from "@/shared/api/api-new";
import { FecesColor, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { DungColorQueryKeys } from "../utils/constants/query-keys";

export function useGetDungColors(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<FecesColor>, Error>({
    queryKey: [DungColorQueryKeys.DUNG_COLORS, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesColorControllerFindAll(params) as Promise<PaginatedEntity<FecesColor>>,
    enabled,
  });
}

export function useGetDungColorsInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT, search, animalTypeId],
    queryFn: (params) => fecesColorControllerFindAll(params.pageParam) as Promise<PaginatedEntity<FecesColor>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
          }
        : null;
    },
  });
}
