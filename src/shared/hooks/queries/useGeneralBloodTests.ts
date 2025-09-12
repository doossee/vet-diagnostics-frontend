import { useQuery } from "@tanstack/react-query";
import { GeneralBloodTest } from "@/shared/types";
import { generalBloodTestControllerFindAll } from "@/shared/api";

export function useGeneralBloodTests({ last, animalId }: { last?: boolean; animalId?: number } = {}) {
  const queryKey = ["general-blood-tests"];
  const params = { page: 1, perPage: 100 };
  if (last) {
    Object.assign(params, { byCreatedDate: "desc" });
    queryKey.push("last");
  }
  if (animalId) {
    Object.assign(params, { animalId });
    queryKey.push("animalId=" + animalId);
  }

  const { data, isLoading }: any = useQuery({
    queryKey,
    queryFn: () => generalBloodTestControllerFindAll(params),
  });

  return {
    generalBloodTests: (data?.data ?? []) as GeneralBloodTest[],
    isLoading,
  };
}
