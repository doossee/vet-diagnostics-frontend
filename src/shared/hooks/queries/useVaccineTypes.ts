import { VaccineType } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { vaccineTypesControllerFindAll } from '@/shared/api'

export function useVaccineTypes() {
    const { data } = useQuery({
        queryKey: ['vaccine-types'],
        queryFn: () => vaccineTypesControllerFindAll({page: 1, perPage: 100})
    })

    return { vaccineTypes: (data?.data ?? []) as VaccineType[] }
}