import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { ADDITIONAL_CRUD_QUERY_KEYS } from "../utils/constants/query-keys";

import { AdditionalCrudModel, PaginatedEntity } from "@/shared/types";
import { fecesConsistencyControllerFindAll, fecesSmellControllerFindAll, fecesFormControllerFindAll,
  urineClarityControllerFindAll, urineConsistencyControllerFindAll, urineSmellControllerFindAll
 } from "@/shared/api/api-new";

// DUNG

export function useGetDungConsistencies(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesConsistencyControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetDungConsistenciesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES_SELECT, search],
    queryFn: (params) => fecesConsistencyControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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

// ================

export function useGetDungSmells(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesSmellControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetDungSmellsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS_SELECT, search],
    queryFn: (params) => fecesSmellControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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

// ================

export function useGetDungForms(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesFormControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetDungFormsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS_SELECT, search],
    queryFn: (params) => fecesFormControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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


// URINE
// =================

export function useGetUrineConsistencies(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES, ...paramsToQueryKeys(params)],
    queryFn: async () => urineConsistencyControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetUrineConsistenciesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_SELECT, search],
    queryFn: (params) => urineConsistencyControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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

// ================

export function useGetUrineSmells(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS, ...paramsToQueryKeys(params)],
    queryFn: async () => urineSmellControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetUrineSmellsInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_SELECT, search],
    queryFn: (params) => urineSmellControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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

// ================

export function useGetUrineClarities(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES, ...paramsToQueryKeys(params)],
    queryFn: async () => urineClarityControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetUrineClaritiesInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_SELECT, search],
    queryFn: (params) => urineClarityControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
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