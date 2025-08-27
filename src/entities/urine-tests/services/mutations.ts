import { UpdateBody, UrineTest } from "@/shared/types"
import { UrineTestSchema } from "@/features/urine-tests"
import { UrineTestQueryKeys } from "../utils/constants/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { urineTestsControllerCreate, urineTestsControllerRemove, urineTestsControllerUpdate } from '@/shared/api'

export function useCreateUrineTest() {
  const client = useQueryClient()

	return useMutation<any, any, UrineTestSchema>({
		mutationFn: urineTestsControllerCreate,
		onSuccess: (data) => {
			createQueryData<UrineTest>(client, [UrineTestQueryKeys.URINE_TESTS], data)
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT] })
		},
	})
}

export function useUpdateUrineTest() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<UrineTestSchema>>({
		mutationFn: async ({ id, body }) => urineTestsControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<UrineTest>(client, [UrineTestQueryKeys.URINE_TESTS], data)
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT] })
		},
	})
}

export function useDeleteUrineTest() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: urineTestsControllerRemove,
		onSuccess: (data) => {
			removeQueryData<UrineTest>(client, [UrineTestQueryKeys.URINE_TESTS], data.id)
      client.invalidateQueries({ queryKey: [UrineTestQueryKeys.URINE_TESTS_SELECT] })
		},
	})
}