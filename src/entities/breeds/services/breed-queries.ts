import { breedsControllerFindAll } from '@/shared/api'
import { ArrayData } from "@/shared/helpers/data-array"
import { Breed, PaginatedEntity } from "@/shared/types"
import { BreedQueryKeys } from "../utils/constants/query-keys"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys"

export function useGetBreeds(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Breed>, Error>({
    queryKey: [BreedQueryKeys.BREEDS, ...paramsToQueryKeys(params)],
    queryFn: async () => breedsControllerFindAll(params) as Promise<PaginatedEntity<Breed>>,
    enabled,
  })
}

export function useGetBreedsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [BreedQueryKeys.BREEDS_SELECT, search],
		queryFn: (params) => breedsControllerFindAll(params.pageParam),
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