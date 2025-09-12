import { Vaccine } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { vaccinesControllerFindAll } from "@/shared/api";

export function useVaccines({ last, animalId }: { last?: boolean; animalId?: number } = {}) {
  const queryKey = ["vaccines"];
  const params = { page: 1, perPage: 100 };
  if (last) {
    Object.assign(params, { byCreatedDate: "desc" });
    queryKey.push("last");
  }
  if (animalId) {
    Object.assign(params, { animalId });
    queryKey.push("animalId=" + animalId);
  }

  const { data }: any = useQuery({
    queryKey,
    queryFn: () => vaccinesControllerFindAll(params),
  });

  return { vaccines: (data?.data ?? []) as Vaccine[] };
}
