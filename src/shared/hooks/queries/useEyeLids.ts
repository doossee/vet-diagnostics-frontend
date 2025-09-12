import { Eyelid } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { eyelidsControllerFindAll } from "@/shared/api";

export function useEyelids() {
  const { data } = useQuery({
    queryKey: ["eye-lids"],
    queryFn: () => eyelidsControllerFindAll({ page: 1, perPage: 100 }),
  });

  return { eyeLids: (data?.data ?? []) as Eyelid[] };
}
