import { DungColor } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { dungColorsControllerFindAll } from '@/shared/api'

export function useDungColors() {
    const { data } = useQuery({
        queryKey: ['dung-colors'],
        queryFn: () => dungColorsControllerFindAll({page: 1, perPage: 100}),
    })

    return { dungColors: (data?.data ?? []) as DungColor[] }
}