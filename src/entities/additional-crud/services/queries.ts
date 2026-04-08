import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";
import { ADDITIONAL_CRUD_QUERY_KEYS } from "../utils/constants/query-keys";

import { AdditionalCrudModel, PaginatedEntity } from "@/shared/types";
import { fecesConsistencyControllerFindAll, fecesSmellControllerFindAll, fecesFormControllerFindAll,
  urineClarityControllerFindAll, urineConsistencyControllerFindAll, urineSmellControllerFindAll,
  animalSexControllerFindAll, bodyPositionControllerFindAll, bodyTypeControllerFindAll,
  constitutionControllerFindAll, downTypeControllerFindAll, featherTypeControllerFindAll,
  hairTypeControllerFindAll, lymphConsistencyControllerFindAll, lymphMobilityControllerFindAll,
  lymphPainControllerFindAll, lymphShapeControllerFindAll, lymphSizeControllerFindAll,
  lymphSurfaceControllerFindAll, lymphTempControllerFindAll, mucosaTypeControllerFindAll,
  obesityTypeControllerFindAll, skinColorControllerFindAll, skinElasticityControllerFindAll,
  skinHumidityControllerFindAll, skinPainControllerFindAll, skinSensitivityControllerFindAll,
  skinSmellControllerFindAll, skinSurfaceControllerFindAll, skinTempControllerFindAll,
  temperamentControllerFindAll, woolTypeControllerFindAll, rumenFluidStateControllerFindAll
 } from "@/shared/api/api-new";

// DUNG

export function useGetDungConsistencies(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<AdditionalCrudModel>, Error>({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES, ...paramsToQueryKeys(params)],
    queryFn: async () => fecesConsistencyControllerFindAll(params) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    enabled,
  });
}

export function useGetDungConsistenciesInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_CONSISTENCIES_SELECT, search, animalTypeId],
    queryFn: (params) => fecesConsistencyControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
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

export function useGetDungSmellsInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_SMELLS_SELECT, search, animalTypeId],
    queryFn: (params) => fecesSmellControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
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

export function useGetDungFormsInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.DUNG_FORMS_SELECT, search, animalTypeId],
    queryFn: (params) => fecesFormControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
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

export function useGetUrineConsistenciesInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CONSISTENCIES_SELECT, search, animalTypeId],
    queryFn: (params) => urineConsistencyControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
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

export function useGetUrineSmellsInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_SMELLS_SELECT, search, animalTypeId],
    queryFn: (params) => urineSmellControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
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

export function useGetUrineClaritiesInfinite(search?: string, animalTypeId?: string) {
  return useInfiniteQuery({
    queryKey: [ADDITIONAL_CRUD_QUERY_KEYS.URINE_CLARITIES_SELECT, search, animalTypeId],
    queryFn: (params) => urineClarityControllerFindAll(params.pageParam) as Promise<PaginatedEntity<AdditionalCrudModel>>,
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), ...(animalTypeId && { animalTypeId }) },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            ...(animalTypeId && { animalTypeId }),
          }
        : null;
    },
  });
}

// COMMON LOOKUPS (NO PAGINATION)
// ==============================

function useGetStaticAdditionalCrudQuery<TData>(
  queryKey: string,
  queryFn: () => Promise<TData>,
  enabled?: boolean
) {
  return useQuery<TData, Error>({
    queryKey: [queryKey],
    queryFn,
    enabled,
    staleTime: Infinity,
  });
}

export function useGetAnimalSexes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.ANIMAL_SEXES,
    () => animalSexControllerFindAll(),
    enabled
  );
}

export function useGetBodyPositions(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.BODY_POSITIONS,
    () => bodyPositionControllerFindAll(),
    enabled
  );
}

export function useGetBodyTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.BODY_TYPES,
    () => bodyTypeControllerFindAll(),
    enabled
  );
}

export function useGetConstitutions(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.CONSTITUTIONS,
    () => constitutionControllerFindAll(),
    enabled
  );
}

export function useGetDownTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.DOWN_TYPES,
    () => downTypeControllerFindAll(),
    enabled
  );
}

export function useGetFeatherTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.FEATHER_TYPES,
    () => featherTypeControllerFindAll(),
    enabled
  );
}

export function useGetHairTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.HAIR_TYPES,
    () => hairTypeControllerFindAll(),
    enabled
  );
}

export function useGetLymphConsistencies(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_CONSISTENCIES,
    () => lymphConsistencyControllerFindAll(),
    enabled
  );
}

export function useGetLymphMobilities(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_MOBILITIES,
    () => lymphMobilityControllerFindAll(),
    enabled
  );
}

export function useGetLymphPains(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_PAINS,
    () => lymphPainControllerFindAll(),
    enabled
  );
}

export function useGetLymphShapes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_SHAPES,
    () => lymphShapeControllerFindAll(),
    enabled
  );
}

export function useGetLymphSizes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_SIZES,
    () => lymphSizeControllerFindAll(),
    enabled
  );
}

export function useGetLymphSurfaces(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_SURFACES,
    () => lymphSurfaceControllerFindAll(),
    enabled
  );
}

export function useGetLymphTemps(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.LYMPH_TEMPS,
    () => lymphTempControllerFindAll(),
    enabled
  );
}

export function useGetRumenFluidStates(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.RUMEN_FLUID_STATES,
    () => rumenFluidStateControllerFindAll(),
    enabled
  );
}

export function useGetMucosaTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.MUCOSA_TYPES,
    () => mucosaTypeControllerFindAll(),
    enabled
  );
}

export function useGetObesityTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.OBESITY_TYPES,
    () => obesityTypeControllerFindAll(),
    enabled
  );
}

export function useGetSkinColors(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_COLORS,
    () => skinColorControllerFindAll(),
    enabled
  );
}

export function useGetSkinElasticities(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_ELASTICITIES,
    () => skinElasticityControllerFindAll(),
    enabled
  );
}

export function useGetSkinHumidities(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_HUMIDITIES,
    () => skinHumidityControllerFindAll(),
    enabled
  );
}

export function useGetSkinPains(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_PAINS,
    () => skinPainControllerFindAll(),
    enabled
  );
}

export function useGetSkinSensitivities(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_SENSITIVITIES,
    () => skinSensitivityControllerFindAll(),
    enabled
  );
}

export function useGetSkinSmells(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_SMELLS,
    () => skinSmellControllerFindAll(),
    enabled
  );
}

export function useGetSkinSurfaces(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_SURFACES,
    () => skinSurfaceControllerFindAll(),
    enabled
  );
}

export function useGetSkinTemps(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.SKIN_TEMPS,
    () => skinTempControllerFindAll(),
    enabled
  );
}

export function useGetTemperaments(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.TEMPERAMENTS,
    () => temperamentControllerFindAll(),
    enabled
  );
}

export function useGetWoolTypes(enabled?: boolean) {
  return useGetStaticAdditionalCrudQuery(
    ADDITIONAL_CRUD_QUERY_KEYS.WOOL_TYPES,
    () => woolTypeControllerFindAll(),
    enabled
  );
}

