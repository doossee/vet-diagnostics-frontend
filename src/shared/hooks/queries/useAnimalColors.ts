import { Color } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { colorsControllerFindAll } from "@/shared/api";

export function useAnimalColors() {
  const { data } = useQuery({
    queryKey: ["animal-colors"],
    queryFn: () => colorsControllerFindAll({ page: 1, perPage: 100 }),
  });

  return { animalColors: (data?.data ?? []) as Color[] };
}
