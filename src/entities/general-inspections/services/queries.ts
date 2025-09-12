import { generalInspectionControllerFindAll } from "@/shared/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { GeneralInspection, PaginatedEntity } from "@/shared/types";
import { GeneralInspectionQueryKeys } from "../utils/constants/query-keys";

export function useGetGeneralInspections(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<GeneralInspection>, Error>({
    queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION, ...paramsToQueryKeys(params)],
    queryFn: async () => generalInspectionControllerFindAll(params) as Promise<PaginatedEntity<GeneralInspection>>,
    enabled,
  });
}

export function useGetGeneralInspectionsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT, search],
    queryFn: (params) => generalInspectionControllerFindAll(params.pageParam) as Promise<PaginatedEntity<GeneralInspection>>,
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

export function useGetLastGeneralInspection(animalId: number | string, enabled?: boolean) {
  return useQuery<GeneralInspection|null>({
    queryKey: [GeneralInspectionQueryKeys.LAST_GENERAL_INSPECTION, animalId],
    queryFn: async () => {
      const { data } = await generalInspectionControllerFindAll({
        page: 1,
        perPage: 1,
        byCreatedDate: "desc",
        animalId
      })

      return data?.[0] ?? null
    },
    enabled,
  });
}