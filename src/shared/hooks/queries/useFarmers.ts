import { Farmer } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { farmersControllerFindAll } from "@/shared/api";

export function useFarmers(enabled: Boolean = true) {
  if (!enabled) return { farmers: [] as Farmer[] };

  const { data } = useQuery({
    queryKey: ["farmers"],
    queryFn: () => farmersControllerFindAll({ page: 1, perPage: 1000 }),
  });

  return { farmers: ((data?.data as any) ?? []) as Farmer[] };
}
