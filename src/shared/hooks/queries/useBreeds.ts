import { Breed } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { breedsControllerFindAll } from "@/shared/api";

export function useBreeds() {
  const { data } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => breedsControllerFindAll({ page: 1, perPage: 1000 }),
  });

  return { breeds: (data?.data ?? []) as Breed[] };
}
