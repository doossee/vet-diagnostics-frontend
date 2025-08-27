import { UpdateBody, DungColor } from "@/shared/types"
import { DungColorSchema } from "@/features/dung-colors"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DungColorQueryKeys } from "../utils/constants/query-keys"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { dungColorsControllerCreate, dungColorsControllerRemove, dungColorsControllerUpdate } from '@/shared/api'

export function useCreateDungColor() {
  const client = useQueryClient()

	return useMutation<any, any, DungColorSchema>({
		mutationFn: dungColorsControllerCreate,
		onSuccess: (data) => {
			createQueryData<DungColor>(client, [DungColorQueryKeys.DUNG_COLORS], data)
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] })
		},
	})
}

export function useUpdateDungColor() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<DungColorSchema>>({
		mutationFn: async ({ id, body }) => dungColorsControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<DungColor>(client, [DungColorQueryKeys.DUNG_COLORS], data)
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] })
		},
	})
}

export function useDeleteDungColor() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: dungColorsControllerRemove,
		onSuccess: (data) => {
			removeQueryData<DungColor>(client, [DungColorQueryKeys.DUNG_COLORS], data.id)
      client.invalidateQueries({ queryKey: [DungColorQueryKeys.DUNG_COLORS_SELECT] })
		},
	})
}