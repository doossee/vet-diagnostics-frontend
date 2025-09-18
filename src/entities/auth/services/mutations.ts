import { ProfileSchema } from "@/features/users";
import { LoginSchema } from "@/features/login/login.model";
import { AuthQueryKeys } from "../utls/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authControllerLogin, usersControllerUpdate } from "@/shared/api";

export function useUpdateProfile() {
  const client = useQueryClient();
  
  return useMutation<any, any, {id: number, body: ProfileSchema}>({
    mutationFn: ({id, body}) => usersControllerUpdate(id, body),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [AuthQueryKeys.PROFILE],
      });
    },
  });
}

export function useLogin() {
  return useMutation<any, any, LoginSchema>({
    mutationFn: authControllerLogin,
  });
}