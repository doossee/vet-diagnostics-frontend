import { VaccineSchema } from "@/features/vaccines"
import { UpdateBody, Vaccine } from "@/shared/types"
import { VaccineQueryKeys } from "../utils/constants/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createQueryData, removeQueryData, updateQueryData } from "@/shared/helpers/query-updater"
import { vaccinesControllerCreate, vaccinesControllerRemove, vaccinesControllerUpdate } from '@/shared/api'

export function useCreateVaccine() {
  const client = useQueryClient()

	return useMutation<any, any, VaccineSchema>({
		mutationFn: vaccinesControllerCreate,
		onSuccess: (data) => {
			createQueryData<Vaccine>(client, [VaccineQueryKeys.VACCINES], data)
      client.invalidateQueries({ queryKey: [VaccineQueryKeys.VACCINES_SELECT] })
		},
	})
}

export function useUpdateVaccine() {
  const client = useQueryClient()

	return useMutation<any, any, UpdateBody<VaccineSchema>>({
		mutationFn: async ({ id, body }) => vaccinesControllerUpdate(+id, body),
		onSuccess: (data) => {
			updateQueryData<Vaccine>(client, [VaccineQueryKeys.VACCINES], data)
      client.invalidateQueries({ queryKey: [VaccineQueryKeys.VACCINES_SELECT] })
		},
	})
}

export function useDeleteVaccine() {
  const client = useQueryClient()

	return useMutation<any, any, number | string>({
		mutationFn: vaccinesControllerRemove,
		onSuccess: (data) => {
			removeQueryData<Vaccine>(client, [VaccineQueryKeys.VACCINES], data.id)
      client.invalidateQueries({ queryKey: [VaccineQueryKeys.VACCINES_SELECT] })
		},
	})
}