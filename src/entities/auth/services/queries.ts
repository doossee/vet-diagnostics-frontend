import { useQuery } from "@tanstack/react-query";
import { usersControllerGetMe } from "@/shared/api/api-new";
import { AuthQueryKeys } from "../utls/constants/query-keys";

export function useGetProfile() {
  return useQuery({
    queryKey: [AuthQueryKeys.PROFILE],
    queryFn: async () => usersControllerGetMe(),
  })
}