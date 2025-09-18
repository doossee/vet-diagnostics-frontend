import { useQuery } from "@tanstack/react-query";
import { usersControllerFindOne } from "@/shared/api";
import { AuthQueryKeys } from "../utls/constants/query-keys";

export function useGetProfile(id: number) {
  return useQuery({
    queryKey: [AuthQueryKeys.PROFILE, id],
    queryFn: async () => usersControllerFindOne(id),
  })
}