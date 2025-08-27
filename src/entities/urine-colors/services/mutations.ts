import { UpdateBody, UrineColor } from "@/shared/types"
import { DiseaseTypeSchema } from "@/features/disease-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UrineColorQueryKeys } from "../utils/constants/query-keys"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { urineColorsControllerCreate, urineColorsControllerRemove, urineColorsControllerUpdate } from '@/shared/api'

export function useCreateUrineColor() {
  const client = useQueryClient()

	return useMutation<any, any, DiseaseTypeSchema>({
		mutationFn: urineColorsControllerCreate,
		onSuccess: (data) => {
			createQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data)
      client.invalidateQueries({ queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT] })
		},
	})
}

export function useUpdateUrineColor() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<DiseaseTypeSchema>>({
		mutationFn: async ({ id, body }) => urineColorsControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data)
      client.invalidateQueries({ queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT] })
		},
	})
}

export function useDeleteUrineColor() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: urineColorsControllerRemove,
		onSuccess: (data) => {
			removeQueryData<UrineColor>(client, [UrineColorQueryKeys.URINE_COLORS], data.id)
      client.invalidateQueries({ queryKey: [UrineColorQueryKeys.URINE_COLORS_SELECT] })
		},
	})
}