import { diseaseTypesControllerFindAll } from "@/shared/api"
import { DiseaseType, PaginatedEntity } from "@/shared/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"
import { DiseaseTypesQueryKeys } from "../utils/constants/query-keys"

export function useGetDiseaseTypes(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<DiseaseType>, Error>({
    queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES, ...paramsToQueryKeys(params)],
    queryFn: async () => diseaseTypesControllerFindAll(params) as Promise<PaginatedEntity<DiseaseType>>,
    enabled,
  })
}

export function useGetDiseaseTypesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT, search],
    queryFn: (params) => diseaseTypesControllerFindAll(params.pageParam) as Promise<PaginatedEntity<DiseaseType>>,
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