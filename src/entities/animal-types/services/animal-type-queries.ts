import { ArrayData } from "@/shared/helpers/data-array";
import { animalTypesControllerFindAll } from "@/shared/api";
import { AnimalType, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { AnimalTypesQueryKeys } from "../utils/constants/query-keys";

export function useGetAnimalTypes(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AnimalType>, Error>({
    queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES, ...paramsToQueryKeys(params)],
    queryFn: async () => animalTypesControllerFindAll(params) as Promise<PaginatedEntity<AnimalType>>,
    enabled,
  });
}

export function useGetAnimalTypesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [AnimalTypesQueryKeys.ANIMAL_TYPES, search],
    queryFn: (params) => animalTypesControllerFindAll(params.pageParam),
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
