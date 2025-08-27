import { vaccinesControllerFindAll } from "@/shared/api"
import { Vaccine, PaginatedEntity } from "@/shared/types"
import { VaccineQueryKeys } from "../utils/constants/query-keys"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"

export function useGetVaccines(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Vaccine>, Error>({
    queryKey: [VaccineQueryKeys.VACCINES, ...paramsToQueryKeys(params)],
    queryFn: async () => vaccinesControllerFindAll(params) as Promise<PaginatedEntity<Vaccine>>,
    enabled,
  })
}

export function useGetVaccinesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [VaccineQueryKeys.VACCINES_SELECT, search],
    queryFn: (params) => vaccinesControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Vaccine>>,
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