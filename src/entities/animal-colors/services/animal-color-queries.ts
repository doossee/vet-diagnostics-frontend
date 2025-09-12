import { colorsControllerFindAll } from "@/shared/api";
import { Color, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { AnimalColorQueryKeys } from "../utils/constants/query-keys";

export function useGetAnimalColors(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Color>, Error>({
    queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS, ...paramsToQueryKeys(params)],
    queryFn: async () => colorsControllerFindAll(params) as Promise<PaginatedEntity<Color>>,
    enabled,
  });
}

export function useGetAnimalColorsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [AnimalColorQueryKeys.ANIMAL_COLORS_SELECT, search],
    queryFn: (params) => colorsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Color>>,
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
