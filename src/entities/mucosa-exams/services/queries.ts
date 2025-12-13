import { MUCOSA_EXAMS_QUERY_KEYS } from "../utils/constants/query-keys";
import { MucosaExam, PaginatedEntity } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { mucosaExamControllerFindAll } from "@/shared/api/api-new";

export function useGetMucosaExams(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<MucosaExam>, Error>({
    queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS, ...paramsToQueryKeys(params)],
    queryFn: async () => mucosaExamControllerFindAll(params) as Promise<PaginatedEntity<MucosaExam>>,
    enabled,
  });
}

export function useGetLastMucosaExamByAnimal(animalId: number | string, enabled?: boolean) {
  return useQuery<MucosaExam|null>({
    queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS_LAST_BY_ANIMAL, animalId],
    queryFn: async () => {
      const { data } = await mucosaExamControllerFindAll({
        page: 1,
        perPage: 1
      })
      
      return data?.[0] ?? null
    },
    enabled,
  });
}

export function useGetMucosaExamsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [MUCOSA_EXAMS_QUERY_KEYS.MUCOSA_EXAMS_SELECT, search],
    queryFn: (params) => mucosaExamControllerFindAll(params.pageParam) as Promise<PaginatedEntity<MucosaExam>>,
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
