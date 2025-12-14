import { Animal, PaginatedEntity } from "@/shared/types";
import { AnimalQueryKeys } from "../utils/constants/query-keys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { animalControllerFindPredict, animalControllerFindAll, animalControllerFindOne } from "@/shared/api/api-new";

export function useGetAnimal(id: string, enabled?: boolean) {
  return useQuery<Animal, Error>({
    queryKey: [AnimalQueryKeys.ANIMALS, id],
    queryFn: async () => animalControllerFindOne(id) as Promise<Animal>,
    enabled,
  });
}

export function useGetAnimalPredict(id: string, enabled?: boolean) {
  return useQuery<Record<number, number>, Error>({
    queryKey: [AnimalQueryKeys.ANIMALS_PREDICT_INFO, id],
    queryFn: async () => animalControllerFindPredict(id) as Promise<Record<number, number>>,
    enabled,
  });
}

export function useGetAnimals(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Animal>, Error>({
    queryKey: [AnimalQueryKeys.ANIMALS, ...paramsToQueryKeys(params)],
    queryFn: async () => animalControllerFindAll(params) as Promise<PaginatedEntity<Animal>>,
    enabled,
  });
}

export function useGetAnimalsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [AnimalQueryKeys.ANIMALS_SELECT, search],
    queryFn: (params) => animalControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Animal>>,
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
