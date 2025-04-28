import { UrineColor } from '@/shared/types'
import { useQuery } from "@tanstack/react-query"
import { urineColorsControllerFindAll } from '@/shared/api'

export function useUrineColors() {
    const { data } = useQuery({
        queryKey: ['urine-colors'],
        queryFn: () => urineColorsControllerFindAll({page: 1, perPage: 100}),
    })

    return { urineColors: (data?.data ?? []) as UrineColor[] }
}