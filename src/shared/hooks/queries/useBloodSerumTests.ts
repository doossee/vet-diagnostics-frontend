import { BloodSerumTest } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { bloodSerumTestsControllerFindAll } from '@/shared/api'

export function useBloodSerumTests({ last, animalId }: { last?: boolean, animalId?: number } = {}) {
    const queryKey = ['blood-serum-tests']
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
        queryFn: () => bloodSerumTestsControllerFindAll(params),
    })

    return { bloodSerumTests: (data?.data ?? []) as BloodSerumTest[] }
}