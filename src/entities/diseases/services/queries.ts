import { diseasesControllerFindAll } from "@/shared/api"
import { Disease, PaginatedEntity } from "@/shared/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"
import { DiseaseQueryKeys } from "../utils/constants/query-keys"

export function useGetDiseases(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Disease>, Error>({
    queryKey: [DiseaseQueryKeys.DISEASES, ...paramsToQueryKeys(params)],
    queryFn: async () => diseasesControllerFindAll(params) as Promise<PaginatedEntity<Disease>>,
    enabled,
  })
}

export function useGetDiseasesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DiseaseQueryKeys.DISEASES_SELECT, search],
    queryFn: (params) => diseasesControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Disease>>,
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