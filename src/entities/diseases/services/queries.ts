import { diseaseControllerFindAll } from "@/shared/api/api-new";
import { Disease, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { DiseaseQueryKeys } from "../utils/constants/query-keys";

export function useGetDiseases(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Disease>, Error>({
    queryKey: [DiseaseQueryKeys.DISEASES, ...paramsToQueryKeys(params)],
    queryFn: async () => diseaseControllerFindAll(params) as Promise<PaginatedEntity<Disease>>,
    enabled,
  });
}

export function useGetLastDisease(animalId: number | string, enabled?: boolean) {
  return useQuery<Disease|null>({
    queryKey: [DiseaseQueryKeys.LAST_DISEASES, animalId],
    queryFn: async () => {
      const { data } = await diseaseControllerFindAll({
        page: 1,
        perPage: 1
      })
      
      return data?.[0] ?? null
    },
    enabled,
  });
}

export function useGetDiseasesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DiseaseQueryKeys.DISEASES_SELECT, search],
    queryFn: (params) => diseaseControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Disease>>,
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
    staleTime: 20 * 60 * 1000, // 20 minutes
  });
}
