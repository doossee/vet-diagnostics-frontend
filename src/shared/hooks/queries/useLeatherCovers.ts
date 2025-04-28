import { LeatherCover } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { leatherCoversControllerFindAll } from '@/shared/api'

export function useLeatherCovers() {
    const { data } = useQuery({
        queryKey: ['leather-covers'],
        queryFn: () => leatherCoversControllerFindAll({page: 1, perPage: 100}),
    })

    return { leatherCovers: (data?.data ?? []) as LeatherCover[] }
}