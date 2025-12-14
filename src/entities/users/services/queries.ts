import { usersControllerFindAll } from "@/shared/api/api-new";
// import { ConvertMap } from "@/shared/helpers/convert-map";
import { UserQueryKeys } from "../utils/constants/query-keys";
import { PaginatedEntity, User } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { paramsToQueryKeys } from "@/shared/helpers/params-to-keys";

export function useGetFarmers(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<User>, Error>({
    queryKey: [UserQueryKeys.FARMERS, ...paramsToQueryKeys(params)],
    queryFn: async () => {
      const result: PaginatedEntity<User> = await usersControllerFindAll({...params, role: "FARMER"});

      return result;
      // return ConvertMap<User, User>(result, ({ user, veterinarianId }) => ({
      //   ...user,
      //   veterinarianId,
      // }));
    },
    enabled,
  });
}

export function useGetFarmersInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UserQueryKeys.FARMERS_SELECT, search],
    queryFn: async (params) => {
      const result = (await usersControllerFindAll(params.pageParam)) as PaginatedEntity<User>;

      return result;
      // return ConvertMap<User, User>(result, ({ user }) => user);
    },
    initialPageParam: { 
      page: 1,
      perPage: 20,
      ...(search && { search }),
      role: "FARMER"
    },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            role: "FARMER"
          }
        : null;
    },
  });
}

export function useGetVeterinarians(params: Record<string, unknown>, enabled?: boolean) {
  return useQuery<PaginatedEntity<User>, Error>({
    queryKey: [UserQueryKeys.VETERINARIANS, ...paramsToQueryKeys(params)],
    queryFn: async () => {
      const result: PaginatedEntity<User> = await usersControllerFindAll({...params, role: "VETERINARIAN"});

      return result;
      // return ConvertMap<Veterinarian, User>(result, ({ user }) => user);
    },
    enabled,
  });
}

export function useGetVeterinariansInfinite(search?: string) {
  return useInfiniteQuery({
    queryKey: [UserQueryKeys.VETERINARIANS_SELECT, search],
    queryFn: async (params) => {
      const result = await usersControllerFindAll(params.pageParam);

      return result;
      // return ConvertMap<User, User>(result, ({ user }) => user);
    },
    initialPageParam: { page: 1, perPage: 20, ...(search && { search }), role: "VETERINARIAN" },
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage?.meta?.currentPage ?? 0) + 1;
      const isLast = lastPage?.meta?.currentPage === lastPage?.meta?.lastPage;

      return !isLast && lastPage?.meta?.total
        ? {
            page: nextPage,
            perPage: 20,
            ...(search && { search }),
            role: "VETERINARIAN"
          }
        : null;
    },
  });
}
