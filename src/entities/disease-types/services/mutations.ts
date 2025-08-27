import { UpdateBody, DiseaseType } from "@/shared/types"
import { DiseaseTypeSchema } from "@/features/disease-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DiseaseTypesQueryKeys } from "../utils/constants/query-keys"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { diseaseTypesControllerCreate, diseaseTypesControllerRemove, diseaseTypesControllerUpdate } from '@/shared/api'

export function useCreateDiseaseType() {
  const client = useQueryClient()

	return useMutation<any, any, DiseaseTypeSchema>({
		mutationFn: diseaseTypesControllerCreate,
		onSuccess: (data) => {
			createQueryData<DiseaseType>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data)
      client.invalidateQueries({ queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT] })
		},
	})
}

export function useUpdateDiseaseType() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<DiseaseTypeSchema>>({
		mutationFn: async ({ id, body }) => diseaseTypesControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<DiseaseType>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data)
      client.invalidateQueries({ queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT] })
		},
	})
}

export function useDeleteDiseaseType() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: diseaseTypesControllerRemove,
		onSuccess: (data) => {
			removeQueryData<DiseaseType>(client, [DiseaseTypesQueryKeys.DISEASE_TYPES], data.id)
      client.invalidateQueries({ queryKey: [DiseaseTypesQueryKeys.DISEASE_TYPES_SELECT] })
		},
	})
}