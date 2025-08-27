import { UpdateBody, GeneralBloodTest } from "@/shared/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GeneralBloodTestSchema } from "@/features/general-blood-tests"
import { GeneralBloodTestQueryKeys } from "../utils/constants/query-keys"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { generalBloodTestControllerCreate, generalBloodTestControllerRemove, generalBloodTestControllerUpdate } from '@/shared/api'

export function useCreateGeneralBloodTest() {
  const client = useQueryClient()

	return useMutation<any, any, GeneralBloodTestSchema>({
		mutationFn: generalBloodTestControllerCreate,
		onSuccess: (data) => {
			createQueryData<GeneralBloodTest>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data)
      client.invalidateQueries({ queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT] })
		},
	})
}

export function useUpdateGeneralBloodTest() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<GeneralBloodTestSchema>>({
		mutationFn: async ({ id, body }) => generalBloodTestControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<GeneralBloodTest>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data)
      client.invalidateQueries({ queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT] })
		},
	})
}

export function useDeleteGeneralBloodTest() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: generalBloodTestControllerRemove,
		onSuccess: (data) => {
			removeQueryData<GeneralBloodTest>(client, [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS], data.id)
      client.invalidateQueries({ queryKey: [GeneralBloodTestQueryKeys.GENERAL_BLOOD_TESTS_SELECT] })
		},
	})
}