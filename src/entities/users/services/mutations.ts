import { UserSchema } from "@/features/users";
import { UpdateBody, User } from "@/shared/types";
import { UserQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater";
import { usersControllerCreate, usersControllerUpdate, usersControllerRemove } from "@/shared/api/api-new";

export function useCreateFarmer() {
  const client = useQueryClient();

  return useMutation<any, any, UserSchema>({
    mutationFn: usersControllerCreate,
    onSuccess: (user) => {
      createQueryData<User>(client, [UserQueryKeys.FARMERS], user);
      client.invalidateQueries({ queryKey: [UserQueryKeys.FARMERS_SELECT] });
    },
  });
}

export function useUpdateFarmer() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<UserSchema>>({
    mutationFn: async ({ id, body }) => usersControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<User>(client, [UserQueryKeys.FARMERS], data);
      client.invalidateQueries({ queryKey: [UserQueryKeys.FARMERS_SELECT] });
    },
  });
}

export function useDeleteFarmer() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => usersControllerRemove(String(id)),
    onSuccess: (data) => {
      removeQueryData<User>(client, [UserQueryKeys.FARMERS], data.id);
      client.invalidateQueries({ queryKey: [UserQueryKeys.FARMERS_SELECT] });
    },
  });
}

export function useCreateVeterinarian() {
  const client = useQueryClient();

  return useMutation<any, any, UserSchema>({
    mutationFn: usersControllerCreate,
    onSuccess: (user) => {
      createQueryData<User>(client, [UserQueryKeys.VETERINARIANS], user);
      client.invalidateQueries({
        queryKey: [UserQueryKeys.VETERINARIANS_SELECT],
      });
    },
  });
}

export function useUpdateVeterinarian() {
  const client = useQueryClient();

  return useMutation<any, any, UpdateBody<UserSchema>>({
    mutationFn: async ({ id, body }) => usersControllerUpdate(String(id), body),
    onSuccess: (data) => {
      updateQueryData<User>(client, [UserQueryKeys.VETERINARIANS], data);
      client.invalidateQueries({
        queryKey: [UserQueryKeys.VETERINARIANS_SELECT],
      });
    },
  });
}

export function useDeleteVeterinarian() {
  const client = useQueryClient();

  return useMutation<any, any, number | string>({
    mutationFn: id => usersControllerRemove(String(id)),
    onSuccess: (data) => {
      removeQueryData<User>(client, [UserQueryKeys.VETERINARIANS], data.id);
      client.invalidateQueries({
        queryKey: [UserQueryKeys.VETERINARIANS_SELECT],
      });
    },
  });
}
