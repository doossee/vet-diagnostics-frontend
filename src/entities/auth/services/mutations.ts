import { ProfileSchema } from "@/features/users";
import { LoginSchema } from "@/features/login/login.model";
import { AuthQueryKeys } from "../utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authControllerLogin, usersControllerUpdateMe, usersControllerChangeMyPassword } from "@/shared/api/api-new";
import { ChangePasswordSchema } from "@/features/users/profile/password-model";

export function useUpdateProfile() {
  const client = useQueryClient();
  
  return useMutation<any, any, ProfileSchema>({
    mutationFn: (body) => usersControllerUpdateMe(body),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [AuthQueryKeys.PROFILE],
      });
    },
  });
}

export function useChangePassword() {
  const client = useQueryClient();
  
  return useMutation<any, any, Omit<ChangePasswordSchema, 'confirmPassword'>>({
    mutationFn: (body) => usersControllerChangeMyPassword(body),
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