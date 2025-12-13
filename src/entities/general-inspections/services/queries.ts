import { ClinicalExam, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { clinicalExamControllerFindAll, clinicalExamControllerFindLastByAnimalId } from "@/shared/api/api-new";
import { GeneralInspectionQueryKeys } from "../utils/constants/query-keys";

export function useGetGeneralInspections(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<ClinicalExam>, Error>({
    queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION, ...paramsToQueryKeys(params)],
    queryFn: async () => clinicalExamControllerFindAll(params) as Promise<PaginatedEntity<ClinicalExam>>,
    enabled,
  });
}

export function useGetGeneralInspectionsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [GeneralInspectionQueryKeys.GENERAL_INSPECTION_SELECT, search],
    queryFn: (params) => clinicalExamControllerFindAll(params.pageParam) as Promise<PaginatedEntity<ClinicalExam>>,
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
    staleTime: 20 * 60 * 1000, // 20 minutes
  });
}

export function useGetLastGeneralInspection(animalId: number | string, enabled?: boolean) {
  return useQuery<ClinicalExam|null>({
    queryKey: [GeneralInspectionQueryKeys.LAST_GENERAL_INSPECTION, animalId],
    queryFn: async () => {
      const data = await clinicalExamControllerFindLastByAnimalId(String(animalId))

      return (data ?? null) as unknown as ClinicalExam | null
    },
    enabled,
  });
}