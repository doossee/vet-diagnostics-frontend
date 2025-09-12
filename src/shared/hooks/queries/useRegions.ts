import { Region } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { regionsControllerFindAll } from "@/shared/api";

export function useRegions() {
  const { data } = useQuery({
    queryKey: ["regions"],
    queryFn: () => regionsControllerFindAll({ page: 1, perPage: 1000 }),
  });

  return { regions: (data?.data ?? []) as Region[] };
}
