import { Disease } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { diseasesControllerFindAll } from "@/shared/api";

export function useDiseases({ last, animalId }: { last?: boolean; animalId?: number } = {}) {
  const queryKey = ["diseases"];
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
    queryFn: () => diseasesControllerFindAll(params),
  });

  return { diseases: (data?.data ?? []) as Disease[] };
}
