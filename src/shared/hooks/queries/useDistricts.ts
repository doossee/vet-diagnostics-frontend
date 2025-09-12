import { District } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { districtsControllerFindAll } from "@/shared/api";

export function useDistricts() {
  const { data } = useQuery({
    queryKey: ["districts"],
    queryFn: () => districtsControllerFindAll({ page: 1, perPage: 1000 }),
  });

  return { districts: (data?.data ?? []) as District[] };
}
