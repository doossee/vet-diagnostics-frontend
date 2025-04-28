import { useQuery } from "@tanstack/react-query"
import { GeneralInspection } from '@/shared/types'
import { generalInspectionControllerFindAll } from '@/shared/api'

export function useGeneralInspection({ last, animalId }: { last?: boolean, animalId?: number } = {}) {
    const queryKey = ['general-inspection']
    const params = {page: 1, perPage: 100}
    if(last) {
        Object.assign(params, { byCreatedDate: 'desc' })
        queryKey.push('last')
    }
    if(animalId) {
        Object.assign(params, { animalId })
        queryKey.push('animalId='+animalId)
    }

    const { data }: any = useQuery({
        queryKey,
        queryFn: () => generalInspectionControllerFindAll(params),
    })

    return { generalInspections: (data?.data ?? []) as GeneralInspection[] }
}