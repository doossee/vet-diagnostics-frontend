import { RegionSchema } from "@/features/regions"
import { UpdateBody, Region } from "@/shared/types"
import { DiseaseTypeSchema } from "@/features/disease-types"
import { RegionsQueryKeys } from "../utils/constants/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { regionsControllerCreate, regionsControllerRemove, regionsControllerUpdate } from '@/shared/api'

export function useCreateRegions() {
  const client = useQueryClient()

	return useMutation<any, any, DiseaseTypeSchema>({
		mutationFn: regionsControllerCreate,
		onSuccess: (data) => {
			createQueryData<RegionSchema>(client, [RegionsQueryKeys.REGIONS], data)
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] })
		},
	})
}

export function useUpdateRegions() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<DiseaseTypeSchema>>({
		mutationFn: async ({ id, body }) => regionsControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<Region>(client, [RegionsQueryKeys.REGIONS], data)
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] })
		},
	})
}

export function useDeleteRegions() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: regionsControllerRemove,
		onSuccess: (data) => {
			removeQueryData<Region>(client, [RegionsQueryKeys.REGIONS], data.id)
      client.invalidateQueries({ queryKey: [RegionsQueryKeys.REGIONS_SELECT] })
		},
	})
}