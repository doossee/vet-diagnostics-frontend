import { ArrayData } from "@/shared/helpers/data-array";
import { vaccineTypesControllerFindAll } from "@/shared/api";
import { VaccineType, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { VaccineTypesQueryKeys } from "../utils/constants/query-keys";

export function useGetVaccineTypes(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<VaccineType>, Error>({
    queryKey: [VaccineTypesQueryKeys.VACCINE_TYPES, ...paramsToQueryKeys(params)],
    queryFn: async () => vaccineTypesControllerFindAll(params) as Promise<PaginatedEntity<VaccineType>>,
    enabled,
  });
}

export function useGetVaccineTypesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [VaccineTypesQueryKeys.VACCINE_TYPES_SELECT, search],
    queryFn: (params) => vaccineTypesControllerFindAll(params.pageParam) as Promise<PaginatedEntity<VaccineType>>,
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
