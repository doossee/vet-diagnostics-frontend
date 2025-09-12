import { inspectionsControllerFindAll } from "@/shared/api";
import { Inspection, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { InspectionQueryKeys } from "../utils/constants/query-keys";

export function useGetInspections(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Inspection>, Error>({
    queryKey: [InspectionQueryKeys.INSPECTION, ...paramsToQueryKeys(params)],
    queryFn: async () => inspectionsControllerFindAll(params) as Promise<PaginatedEntity<Inspection>>,
    enabled,
  });
}

export function useGetInspectionsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [InspectionQueryKeys.INSPECTION_SELECT, search],
    queryFn: (params) => inspectionsControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Inspection>>,
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
