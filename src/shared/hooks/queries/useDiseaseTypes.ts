import { DiseaseType } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { diseaseTypesControllerFindAll } from "@/shared/api";

export function useDiseaseTypes() {
  const { data } = useQuery({
    queryKey: ["disease-types"],
    queryFn: () => diseaseTypesControllerFindAll({ page: 1, perPage: 100 }),
  });

  return { diseaseTypes: (data?.data ?? []) as DiseaseType[] };
}
