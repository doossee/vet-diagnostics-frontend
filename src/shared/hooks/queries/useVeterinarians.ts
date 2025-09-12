import { User } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { veterinariansControllerFindAll } from "@/shared/api";

export function useVeterinarians(enabled: boolean = true) {
  if (!enabled) return { veterinarians: [] as User[] };

  const { data } = useQuery({
    queryKey: ["veterinarian"],
    queryFn: () => veterinariansControllerFindAll({ page: 1, perPage: 100 }),
  });

  return {
    veterinarians: (data?.data.map((v) => v.user) ?? ([] as any)) as User[],
  };
}
