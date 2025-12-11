import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { DiseaseCategory, PaginatedEntity } from "@/shared/types";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { DiseaseTypesQueryKeys } from "../utils/constants/query-keys";
import { diseaseCategoryControllerFindAll } from "@/shared/api/api-new";

export function useGetDiseaseTypes(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<DiseaseCategory>, Error>({
    queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES, ...paramsToQueryKeys(params)],
    queryFn: async () => diseaseCategoryControllerFindAll(params) as Promise<PaginatedEntity<DiseaseCategory>>,
    enabled,
  });
}

export function useGetDiseaseTypesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT, search],
    queryFn: (params) => diseaseCategoryControllerFindAll(params.pageParam) as Promise<PaginatedEntity<DiseaseCategory>>,
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
