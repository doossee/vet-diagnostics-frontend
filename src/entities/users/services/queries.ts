import { farmersControllerFindAll, veterinariansControllerFindAll } from "@/shared/api";
import { ConvertMap } from "@/shared/helpers/convert-map";
import { UserQueryKeys } from "../utils/constants/query-keys";
import { Farmer, PaginatedEntity, User, Veterinarian } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetFarmers(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<User>, Error>({
    queryKey: [UserQueryKeys.FARMERS, ...paramsToQueryKeys(params)],
    queryFn: async () => {
      const result: PaginatedEntity<Farmer> = await farmersControllerFindAll(params);

      return ConvertMap<Farmer, User>(result, ({ user, veterinarianId }) => ({
        ...user,
        veterinarianId,
      }));
    },
    enabled,
  });
}

export function useGetFarmersInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UserQueryKeys.FARMERS_SELECT, search],
    queryFn: async (params) => {
      const result = (await farmersControllerFindAll(params.pageParam)) as PaginatedEntity<Farmer>;

      return ConvertMap<Farmer, User>(result, ({ user }) => user);
    },
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

export function useGetVeterinarians(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<User>, Error>({
    queryKey: [UserQueryKeys.VETERINARIANS, ...paramsToQueryKeys(params)],
    queryFn: async () => {
      const result: PaginatedEntity<Veterinarian> = await veterinariansControllerFindAll(params);

      return ConvertMap<Veterinarian, User>(result, ({ user }) => user);
    },
    enabled,
  });
}

export function useGetVeterinariansInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UserQueryKeys.VETERINARIANS_SELECT, search],
    queryFn: async (params) => {
      const result = await veterinariansControllerFindAll(params.pageParam);

      return ConvertMap<Veterinarian, User>(result, ({ user }) => user);
    },
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
