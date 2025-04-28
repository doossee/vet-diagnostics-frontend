import { AnimalType } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { animalTypesControllerFindAll } from '@/shared/api'

export function useAnimalTypes() {
    const { data } = useQuery({
        queryKey: ['animal-types'],
        queryFn: () => animalTypesControllerFindAll({page: 1, perPage: 100})
    })

    return { animalTypes: (data?.data ?? []) as AnimalType[] }
}