import { prophylaxisControllerFindAll, prophylaxisDetailControllerFindAll, prophylaxisItemControllerFindAll } from "@/shared/api/api-new";
import { Prophylaxis, ProphylaxisDetail, ProphylaxisItem, PaginatedEntity, ProphylaxisType } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { ProphylaxisQueryKeys } from "../utils/constants/query-keys";

export function useGetProphylaxis(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<Prophylaxis>, Error>({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisControllerFindAll(params) as Promise<PaginatedEntity<Prophylaxis>>,
    enabled,
  });
}

export function useGetProphylaxisInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_SELECT, search],
    queryFn: (params) => prophylaxisControllerFindAll(params.pageParam) as Promise<PaginatedEntity<Prophylaxis>>,
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

export function useGetProphylaxisItems(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<ProphylaxisItem>, Error>({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_ITEMS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisItemControllerFindAll(params) as Promise<PaginatedEntity<ProphylaxisItem>>,
    enabled,
  });
}

export function useGetProphylaxisItemsInfinite(type?: ProphylaxisType, search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_ITEMS_SELECT, type, search],
    queryFn: (params) => prophylaxisItemControllerFindAll(params.pageParam) as Promise<PaginatedEntity<ProphylaxisItem>>,
    initialPageParam: { page: 1, perPage: 20, type, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            type,
            ...(search && { search }),
          }
        : null;
    },
    enabled: !!type
  });
}

export function useGetProphylaxisDetails(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<ProphylaxisDetail>, Error>({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_DETAILS, ...paramsToQueryKeys(params)],
    queryFn: async () => prophylaxisDetailControllerFindAll(params) as Promise<PaginatedEntity<ProphylaxisDetail>>,
    enabled,
  });
}

export function useGetProphylaxisDetailsInfinite(itemId?: string, search?: string) {
  return useInfiniteQuery({
    queryKey: [ProphylaxisQueryKeys.PROPHYLAXIS_DETAILS_SELECT, itemId, search],
    queryFn: (params) => prophylaxisDetailControllerFindAll(params.pageParam) as Promise<PaginatedEntity<ProphylaxisDetail>>,
    initialPageParam: { page: 1, perPage: 20, itemId, ...(search && { search }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            itemId,
            ...(search && { search }),
          }
        : null;
    },
    enabled: !!itemId
  });
}
