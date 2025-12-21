import { PaginatedEntity, UrineColor } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { urineColorControllerFindAll } from "@/shared/api/api-new";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { UrineColorQueryKeys } from "../utils/constants/query-keys";

export function useGetUrineColors(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<UrineColor>, Error>({
    queryKey: [UrineColorQueryKeys.URINE_COLORS, ...paramsToQueryKeys(params)],
    queryFn: async () => urineColorControllerFindAll(params) as Promise<PaginatedEntity<UrineColor>>,
    enabled,
  });
}

export function useGetUrineColorsInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT, search, animalTypeId],
    queryFn: (params) => urineColorControllerFindAll(params.pageParam) as Promise<PaginatedEntity<UrineColor>>,
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
