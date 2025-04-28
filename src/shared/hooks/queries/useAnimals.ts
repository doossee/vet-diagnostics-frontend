import { Animal } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { animalsControllerFindOne, animalsControllerFindAll } from '@/shared/api'

export function useAnimals({ id, typeId }: { id?: number | null, typeId?: number | null } = {}) {
    if(id) {
        const { data } = useQuery({
            queryKey: ['animals', 'id='+id],
            queryFn:  async () => {
                const data = await animalsControllerFindOne(id)
                return [data]
            }
        })
        return { animals: (data ?? [] as any) as Animal[] }
    } else if(typeId) {
        const { data } = useQuery({
            queryKey: ['animals', 'typeId='+typeId],
            queryFn:  async () => {
                const { data }: any = await animalsControllerFindAll({page: 1, perPage: 100, typeId})
                return data
            }
        })
        return { animals: (data ?? [] as any) as Animal[] }
    } else {
        const { data } = useQuery({
            queryKey: ['animals'],
            queryFn:  async () => {
                const { data }: any = await animalsControllerFindAll({page: 1, perPage: 100})
                return data
            }
        })
    
        return { animals: (data ?? []) as Animal[] }
    }
}