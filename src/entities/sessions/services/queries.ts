import { PaginatedEntity, MedicalSession } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { medicalSessionControllerFindAll, medicalSessionControllerFindOne } from "@/shared/api/api-new";
import { SessionsQueryKeys } from "../utils/constants/query-keys";

export function useGetMedicalSessions(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<MedicalSession>, Error>({
    queryKey: [SessionsQueryKeys.SESSIONS, ...paramsToQueryKeys(params)],
    queryFn: async () => medicalSessionControllerFindAll(params) as Promise<PaginatedEntity<MedicalSession>>,
    enabled,
  });
}

export function useGetMedicalSessionById(id: string, enabled?: boolean) {
  return useQuery<MedicalSession, Error>({
    queryKey: [SessionsQueryKeys.SESSIONS_BY_ID, id],
    queryFn: async () => medicalSessionControllerFindOne(id) as Promise<MedicalSession>,
    enabled,
  });
}

export function useGetMedicalSessionsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [SessionsQueryKeys.SESSIONS_SELECT, search],
    queryFn: (params) => medicalSessionControllerFindAll(params.pageParam) as Promise<PaginatedEntity<MedicalSession>>,
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