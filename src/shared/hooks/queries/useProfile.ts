import { useQuery } from "@tanstack/react-query";
import { usersControllerFindOne } from "@/shared/api";

export function useProfile(id: number) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => usersControllerFindOne(id),
  });
}
