import { urineColorsControllerFindAll } from "@/shared/api"
import { PaginatedEntity, UrineColor } from "@/shared/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"
import { UrineColorQueryKeys } from "../utils/constants/query-keys"

export function useGetUrineColors(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<UrineColor>, Error>({
    queryKey: [UrineColorQueryKeys.URINE_COLORS, ...paramsToQueryKeys(params)],
    queryFn: async () => urineColorsControllerFindAll(params) as Promise<PaginatedEntity<UrineColor>>,
    enabled,
  })
}

export function useGetUrineColorsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT, search],
    queryFn: (params) => urineColorsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<UrineColor>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage??0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total ? {
        page: nextPage,
        perPage: 20,
        ...(search && { search })
      } : null;
    },
  })
}