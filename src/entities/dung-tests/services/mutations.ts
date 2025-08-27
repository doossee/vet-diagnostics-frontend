import { UpdateBody, DungTest } from "@/shared/types"
import { DungTestSchema } from "@/features/dung-tests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DungTestQueryKeys } from "../utils/constants/query-keys"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { dungTestsControllerCreate, dungTestsControllerRemove, dungTestsControllerUpdate } from '@/shared/api'

export function useCreateDungTest() {
  const client = useQueryClient()

	return useMutation<any, any, DungTestSchema>({
		mutationFn: dungTestsControllerCreate,
		onSuccess: (data) => {
			createQueryData<DungTest>(client, [DungTestQueryKeys.DUNG_TESTS], data)
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT] })
		},
	})
}

export function useUpdateDungTest() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<DungTestSchema>>({
		mutationFn: async ({ id, body }) => dungTestsControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<DungTest>(client, [DungTestQueryKeys.DUNG_TESTS], data)
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT] })
		},
	})
}

export function useDeleteDungTest() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: dungTestsControllerRemove,
		onSuccess: (data) => {
			removeQueryData<DungTest>(client, [DungTestQueryKeys.DUNG_TESTS], data.id)
      client.invalidateQueries({ queryKey: [DungTestQueryKeys.DUNG_TESTS_SELECT] })
		},
	})
}